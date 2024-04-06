import { Component, Show } from 'solid-js';
import { useStore } from './store';
import { Entry as EntryType } from './types';
import DateDisplay from './Date';

export type EntryProps = EntryType & {
  selected?: boolean;
  onEdit?: (entry: EntryType) => void;
};

const Entry: Component<EntryProps> = (props: EntryProps) => {
  const [, {}] = useStore();

  return (
    <div class="w-3/4 ml-auto grid grid-cols-3 group">
      <div class="col-span-2 whitespace-pre-wrap break-words">{props.content}</div>
      <DateDisplay date={props.createdAt} />
    </div>
  );
};

export default Entry;
