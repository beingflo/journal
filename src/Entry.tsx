import { Component, For, Show } from 'solid-js';
import { useStore } from './store';
import { Entry as EntryType } from './types';
import DateDisplay from './Date';

export type EntryProps = EntryType & {
  selected?: boolean;
  onEdit?: (entry: EntryType) => void;
};

const Entry: Component<EntryProps> = (props: EntryProps) => {
  const [, {}] = useStore();

  const lines = props.content.split(/\r?\n/);

  let cleanEntry = '';
  let tags = [];

  if (lines[lines.length - 1].startsWith('#')) {
    cleanEntry = lines.slice(0, -1).join('\n');
    tags = lines[lines.length - 1].replaceAll('#', '').split(' ');
  } else {
    cleanEntry = lines.join('\n');
  }

  return (
    <div class="w-full grid grid-cols-3 group">
      <div class="col-span-2 flex flex-col gap-2 w-full overflow-hidden">
        <div class="whitespace-pre-wrap break-words">{cleanEntry}</div>
        <div class="flex flex-row gap-4">
          <For each={tags}>
            {(tag, idx) => <span class="text-sm text-gray-400">#{tag}</span>}
          </For>
        </div>
      </div>
      <DateDisplay date={props.createdAt} />
    </div>
  );
};

export default Entry;
