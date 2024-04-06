import { Component, createSignal } from 'solid-js';
import { useStore } from './store';
import { Entry } from './types';

export type NewEntryProps = {
  onEditEnd: () => void;
  editEntry?: Entry;
  ref: any;
};

const NewEntry: Component<NewEntryProps> = props => {
  const [, { syncState }] = useStore();

  const [newEntryContent, setNewEntryContent] = createSignal(null);

  const onEditEnd = event => {
    event?.preventDefault();

    if (props.editEntry) {
      // Todo
      console.log('modify entry');
    } else {
      // Todo
      console.log('add entry');
    }
    syncState();
    props.onEditEnd();
  };

  return (
    <div class="w-full grid grid-cols-12 gap-2 group">
      <div class="flex flex-row gap-2 text-sm font-light col-span-6 underline-offset-4">
        <form onSubmit={onEditEnd} class="w-full">
          <input
            autofocus
            class="w-full border border-dashed border-gray-400 focus:outline-none"
            placeholder="url"
            ref={props.ref}
            value={props.editEntry?.content ?? ''}
            onInput={event => console.log(event?.currentTarget.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default NewEntry;
