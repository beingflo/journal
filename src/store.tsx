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
  : { screen: 'help', entries: [], tags: [], selectedAutoTags: [] };

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
      addNewEntry(content: string, date: number) {
        setState({
          entries: [
            ...(state.entries ?? []),
            {
              id: getNewId(),
              content,
              createdAt: date,
              modifiedAt: Date.now(),
              deletedAt: null,
            },
          ],
        });
      },
      toggleAutoTag(tagId: string) {
        const selectedAutoTag = state.selectedAutoTags?.find(tag => tag === tagId);

        if (selectedAutoTag) {
          setState({
            selectedAutoTags: state.selectedAutoTags.filter(tag => tag !== tagId),
          });
        } else {
          setState({
            selectedAutoTags: [...(state.selectedAutoTags ?? []), tagId],
          });
        }
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
            state.selectedAutoTags = state.selectedAutoTags.filter(tag => tag !== tagId);
          }),
        );
      },
      deleteEntry(entryId: string) {
        setState(
          produce((state: any) => {
            const selectedEntry = state.entries.find(entry => entry.id === entryId);

            selectedEntry.deletedAt = Date.now();
            selectedEntry.modifiedAt = Date.now();
          }),
        );
      },
      updateEntry(id: string, content: string) {
        setState(
          produce((state: any) => {
            state.entries.forEach(entry => {
              if (entry.id === id) {
                entry.content = content;
                entry.modifiedAt = Date.now();
              }
            });
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
