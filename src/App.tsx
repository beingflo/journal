import {
  For,
  Match,
  Show,
  Switch,
  createSignal,
  onCleanup,
  type Component,
} from 'solid-js';
import { validateEvent } from './utils';
import { tinykeys } from 'tinykeys';
import { useStore } from './store';
import { ephemeralStore } from './EphemeralStore';
import Configuration from './Configuration';
import Help from './Help';
import { Feedback } from './Feedback';
import NewEntry from './NewEntry';
import Entry from './Entry';

const App: Component = () => {
  const [state, { cycleScreen, syncState }] = useStore();
  const [newEntryMode, setNewEntryMode] = createSignal(false);
  const [searchTerm, setSearchTerm] = createSignal('');
  const [editEntry, setEditEntry] = createSignal(null);
  const [selectedEntryIdx, setSelectedEntryIdx] = createSignal(0);

  let searchInputRef;
  let newEntryInputRef;

  const entries = () => {
    const visibleEntries = state.entries?.filter(entry => !entry.deletedAt) ?? [];
    const terms = searchTerm()?.split(' ');
    const filteredEntries = visibleEntries?.filter(entry =>
      terms.every(term => entry.content?.toLowerCase()?.includes(term?.toLowerCase())),
    );
    filteredEntries?.sort((a, b) => b.createdAt - a.createdAt);
    return filteredEntries;
  };

  const onNew = () => {
    setNewEntryMode(true);
    newEntryInputRef?.focus();
  };

  const cleanup = tinykeys(window, {
    n: validateEvent(onNew),
    Escape: () => {
      setNewEntryMode(false);
      setEditEntry(null);
      searchInputRef.blur();
    },
    h: validateEvent(() => cycleScreen('help')),
    c: validateEvent(() => cycleScreen('config')),
    f: validateEvent(() => cycleScreen('feedback')),
    s: validateEvent(syncState),
    '$mod+k': validateEvent(() => {
      searchInputRef.focus();
    }),
    ArrowUp: event => {
      setSelectedEntryIdx(oldIdx => Math.max(oldIdx - 1, 0));
      event.preventDefault();
    },
    ArrowDown: event => {
      setSelectedEntryIdx(oldIdx => Math.min(oldIdx + 1, entries().length - 1));
      event.preventDefault();
    },
  });

  onCleanup(cleanup);

  return (
    <Switch
      fallback={
        <>
          <div class="flex flex-col w-full p-2 md:p-4">
            <div class="w-full max-w-8xl mx-auto">
              <form onSubmit={event => event.preventDefault()}>
                <input
                  type="text"
                  ref={searchInputRef}
                  class="focus:outline-none w-1/2 p-1 px-2 mx-auto text-md placeholder:font-thin block mb-12 border border-black focus:ring-0"
                  placeholder=""
                  autofocus
                  value={searchTerm()}
                  onInput={event => {
                    setSearchTerm(event?.currentTarget?.value);
                    setSelectedEntryIdx(0);
                  }}
                />
              </form>
              <div class="flex flex-col gap-4">
                <Show when={newEntryMode()}>
                  <NewEntry
                    ref={newEntryInputRef}
                    onEditEnd={() => setNewEntryMode(false)}
                  />
                </Show>
                <For each={entries()}>
                  {(entry, idx) => (
                    <Show
                      when={entry.id === editEntry()?.id}
                      fallback={
                        <Entry
                          id={entry.id}
                          content={entry.content}
                          createdAt={entry.createdAt}
                          modifiedAt={entry.modifiedAt}
                          selected={idx() === selectedEntryIdx()}
                          onEdit={link => {
                            setEditEntry(link);
                          }}
                        />
                      }
                    >
                      <NewEntry
                        ref={newEntryInputRef}
                        editEntry={editEntry()}
                        onEditEnd={() => {
                          setEditEntry(null);
                        }}
                      />
                    </Show>
                  )}
                </For>
              </div>
            </div>
          </div>
          <Show when={ephemeralStore.showToast}>
            <div class="fixed bottom-0 right-0 grid gap-x-2 grid-cols-2 bg-white p-2 font-light text-sm">
              <p class="text-right">new</p>
              <p>
                {ephemeralStore?.new[0]} local, {ephemeralStore?.new[1]} remote
              </p>
              <p class="text-right">old</p>
              <p>
                {ephemeralStore?.dropped[0]} local, {ephemeralStore?.dropped[1]} remote
              </p>
            </div>
          </Show>
        </>
      }
    >
      <Match when={state.screen === 'help'}>
        <Help />
      </Match>
      <Match when={state.screen === 'config'}>
        <Configuration />
      </Match>
      <Match when={state.screen === 'feedback'}>
        <Feedback />
      </Match>
    </Switch>
  );
};

export default App;
