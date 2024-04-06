import { Component, Show } from 'solid-js';
import { useStore } from './store';
import { Entry as EntryType } from './types';

export type EntryProps = EntryType & {
  selected?: boolean;
  onEdit?: (entry: EntryType) => void;
};

const Entry: Component<EntryProps> = (props: EntryProps) => {
  const [, {}] = useStore();

  return (
    <div class="w-full grid grid-cols-12 group gap-2">
      <div class="flex flex-col gap-2 text-sm font-light">
        {props.content}
        <div class="hidden group-hover:flex text-sm font-light flex-row gap-2">
          <div onClick={() => console.log(props.id)} class="hover:cursor-pointer">
            del
          </div>
          <div
            onClick={() =>
              props.onEdit({
                id: props.id,
                content: props.content,
                createdAt: props.createdAt,
                modifiedAt: props.modifiedAt,
              })
            }
            class="hover:cursor-pointer"
          >
            edit
          </div>
        </div>
      </div>
      <p
        class="hidden md:block text-sm font-light text-right col-span-1"
        title={
          props.createdAt &&
          new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }).format(new Date(props.createdAt))
        }
      >
        {props.createdAt
          ? new Intl.DateTimeFormat('en-US', {
              day: '2-digit',
              month: 'long',
            }).format(new Date(props.createdAt))
          : 'never'}
      </p>
    </div>
  );
};

export default Entry;
