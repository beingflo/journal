import { Component, For, Show } from 'solid-js';
import { useStore } from './store';
import { Entry as EntryType } from './types';
import DateDisplay from './Date';
import { splitTagAndContent } from './utils';

export type EntryProps = EntryType & {
  selected?: boolean;
  onEdit?: (entry: EntryType) => void;
};

const Entry: Component<EntryProps> = (props: EntryProps) => {
  const [, { deleteEntry }] = useStore();

  const [cleanEntry, tags] = splitTagAndContent(props.content);

  return (
    <div class="w-full grid grid-cols-3 group items-baseline">
      <div class="col-span-2 flex flex-col gap-1 w-full">
        <div class="whitespace-pre-wrap break-words">{cleanEntry}</div>
        <div class="flex flex-row gap-4">
          <Show when={tags.length > 0}>
            <pre class="font-sans text-sm text-gray-400">
              {tags.map(t => `#${t}`).join('  ')}
            </pre>
          </Show>
        </div>
        <div class="invisible group-hover:visible flex text-sm font-light flex-row gap-2">
          <div onClick={() => deleteEntry(props.id)} class="hover:cursor-pointer">
            del
          </div>
          <div
            onClick={() =>
              props.onEdit({
                id: props.id,
                content: props.content,
                createdAt: props.createdAt,
                modifiedAt: props.modifiedAt,
                deletedAt: props.deletedAt,
              })
            }
            class="hover:cursor-pointer"
          >
            edit
          </div>
        </div>
      </div>
      <DateDisplay date={props.createdAt} />
    </div>
  );
};

export default Entry;
