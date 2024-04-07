import { Component, createSignal, onCleanup } from 'solid-js';
import { useStore } from './store';
import { Entry } from './types';
import { tinykeys } from 'tinykeys';
import DateDisplay from './Date';

export type NewEntryProps = {
  onEditEnd: () => void;
  editEntry?: Entry;
  ref: any;
};

const NewEntry: Component<NewEntryProps> = props => {
  const [, { addNewEntry, syncState }] = useStore();

  const [newEntryContent, setNewEntryContent] = createSignal(null);

  const onEditEnd = event => {
    event?.preventDefault();

    if (props.editEntry) {
      // Todo
      console.log('modify entry');
    } else {
      addNewEntry(newEntryContent());
    }

    syncState();
    props.onEditEnd();
  };

  const cleanup = tinykeys(window, {
    '$mod+Enter': () => onEditEnd(null),
  });

  onCleanup(cleanup);

  return (
    <div class="w-full grid grid-cols-3 group">
      <form onSubmit={onEditEnd} class="col-span-2">
        <textarea
          autofocus
          class="w-full min-h-48 border p-1 px-2 border-black focus:outline-none"
          placeholder=""
          ref={props.ref}
          value={props.editEntry?.content ?? ''}
          onInput={event => setNewEntryContent(event?.currentTarget.value)}
        />
      </form>
      <DateDisplay date={Date.now()} />
    </div>
  );
};

export default NewEntry;
