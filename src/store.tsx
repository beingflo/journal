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
  : { screen: 'help', entries: [], tags: [] };

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
      setSelectedTag(tagId: string) {
        setState({ selectedTag: tagId });
      },
      addNewTag(tag: string) {
        const id = getNewId();

        setState({
          tags: [
            ...(state.tags ?? []),
            {
              id,
              name: tag,
              createdAt: Date.now(),
              modifiedAt: Date.now(),
              deletedAt: null,
            },
          ],
        });

        return id;
      },
      deleteTag(tagId: string) {
        setState(
          produce((state: any) => {
            const selectedTag = state.tags.find(tag => tag.id === tagId);

            selectedTag.deletedAt = Date.now();
            selectedTag.modifiedAt = Date.now();
          }),
        );
      },
      changeSelectedTag(direction: 'UP' | 'DOWN') {
        setState(
          produce((state: any) => {
            const selectedTagIndex = state.tags.findIndex(
              tag => tag.id === state.selectedTag,
            );

            const newIndexDirection = direction === 'UP' ? -1 : 1;
            let newIndex = selectedTagIndex;
            do {
              newIndex = newIndex + newIndexDirection;
              if (newIndex < 0) {
                newIndex = state.tags.length - 1;
              }
              if (newIndex >= state.tags.length) {
                newIndex = 0;
              }
            } while (state.tags[newIndex].deletedAt);

            state.selectedTag = state.tags[newIndex].id;
          }),
        );
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
