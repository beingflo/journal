import { Component, createSignal, onCleanup } from 'solid-js';
import { useStore } from './store';
import { Entry } from './types';
import { tinykeys } from 'tinykeys';
import DateDisplay from './Date';
import { addTagToContent } from './utils';

export type NewEntryProps = {
  onEditEnd: () => void;
  editEntry?: Entry;
  ref: any;
};

const NewEntry: Component<NewEntryProps> = props => {
  const [state, { addNewEntry, syncState }] = useStore();

  const [newEntryContent, setNewEntryContent] = createSignal(null);

  const onEditEnd = event => {
    event?.preventDefault();

    if (props.editEntry) {
      // Todo
      console.log('modify entry');
    } else {
      const selectedTag = state.tags.find(tag => tag.id === state.selectedTag).name;
      const contentWithTags = addTagToContent(newEntryContent(), selectedTag);
      addNewEntry(contentWithTags);
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
