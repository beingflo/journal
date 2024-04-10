import { Component, Ref, Show, createSignal, onCleanup } from 'solid-js';
import { useStore } from './store';
import { Entry } from './types';
import { tinykeys } from 'tinykeys';
import DateDisplay from './Date';
import { addTagsToContent, dateToISOLocal } from './utils';

export type NewEntryProps = {
  onEditEnd: () => void;
  editEntry?: Entry;
  ref: Ref<HTMLTextAreaElement>;
};

const NewEntry: Component<NewEntryProps> = props => {
  const [state, { addNewEntry, syncState, updateEntry }] = useStore();

  const initDate = props.editEntry
    ? dateToISOLocal(new Date(props.editEntry.createdAt))
    : dateToISOLocal(new Date());

  const [newEntryContent, setNewEntryContent] = createSignal(
    props?.editEntry?.content ?? '',
  );
  const [newEntryDate, setNewEntryDate] = createSignal(initDate);

  const onEditEnd = event => {
    const content = newEntryContent() || '-';

    if (props.editEntry) {
      updateEntry(props.editEntry.id, content);
    } else {
      const selectedTags = state.tags
        .filter(tag => state.selectedAutoTags.includes(tag.id) && !tag.deletedAt)
        ?.map(t => t.name);

      const contentWithTags = selectedTags
        ? addTagsToContent(content, selectedTags)
        : content;
      addNewEntry(contentWithTags, new Date(newEntryDate()).getTime());
    }

    syncState();
    props.onEditEnd();

    event?.preventDefault();
  };

  const cleanup = tinykeys(window, {
    '$mod+Enter': () => onEditEnd(null),
  });

  onCleanup(cleanup);

  return (
    <div class="w-full grid grid-cols-3 group">
      <form class="col-span-2">
        <textarea
          autofocus
          class="w-full min-h-48 border p-1 px-2 border-black focus:outline-none"
          placeholder=""
          ref={props.ref}
          value={props.editEntry?.content ?? ''}
          onInput={event => setNewEntryContent(event?.currentTarget.value)}
        />
      </form>
      <Show
        when={!props.editEntry}
        fallback={<DateDisplay date={props.editEntry?.createdAt} />}
      >
        <div class="mx-auto">
          <input
            class="text-sm font-light text-center col-span-1"
            type="datetime-local"
            name="date"
            onInput={event => setNewEntryDate(event?.currentTarget.value)}
            value={newEntryDate()}
          />
        </div>
      </Show>
    </div>
  );
};

export default NewEntry;
