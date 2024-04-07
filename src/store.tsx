import { createContext, createEffect, useContext } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { getNewId } from './utils';
import { s3Sync } from './s3-utils';
import { setEphemeralStore } from './EphemeralStore';
import { Screens, State } from './types';

export const storeName = 'store';

const StoreContext = createContext({});

const localState: string = localStorage.getItem(storeName);

let parsedState: State = localState
  ? JSON.parse(localState)
  : { screen: 'help', entries: [] };

export const [state, setState] = createStore(parsedState);

export function StoreProvider(props) {
  createEffect(() => localStorage.setItem(storeName, JSON.stringify(state)));

  const store = [
    state,
    {
      cycleScreen(screen: Screens) {
        const currentScreen = state.screen;
        let newScreen: Screens = 'app';
        if (currentScreen !== screen) {
          newScreen = screen;
        }
        setState({ screen: newScreen });
      },
      setSelectedProject(projectId: string) {
        setState({ selectedProject: projectId });
      },
      setS3Config(config: Object) {
        setState({ s3: config });
      },
      addNewEntry(content: string) {
        setState({
          entries: [
            ...(state.entries ?? []),
            {
              id: getNewId(),
              content,
              createdAt: Date.now(),
              deletedAt: null,
            },
          ],
        });
      },
      async syncState() {
        const [newLocal, newRemote, droppedLocal, droppedRemote] = await s3Sync(state);

        if (state?.s3) {
          setTimeout(() => setEphemeralStore({ showToast: false }), 4000);

          setEphemeralStore({
            new: [newLocal, newRemote] ?? [0, 0],
            dropped: [droppedLocal, droppedRemote] ?? [0, 0],
            showToast: true,
          });
        }
      },
    },
  ];

  return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext) as any;
}
