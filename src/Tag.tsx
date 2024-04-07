import { Component, Show, createSignal } from 'solid-js';
import { useStore } from './store';
import { Tag as TagType } from './types';

export type Props = {
  tag: TagType;
};

const Tag: Component<Props> = (props: Props) => {
  const [state, { setSelectedTag, deleteTag }] = useStore();
  const [showDelConfirm, setShowDelConfirm] = createSignal(false);

  const toggleSelection = () => {
    if (state.selectedTag && state.selectedTag === props.tag.id) {
      setSelectedTag(null);
    } else {
      setSelectedTag(props.tag.id);
    }
  };

  return (
    <div class="group flex flex-row gap-1 items-baseline">
      <div
        onClick={toggleSelection}
        class={`truncate cursor-pointer ${
          state.selectedTag === props.tag.id && 'underline'
        }`}
      >
        {props.tag.name || 'unnamed'}
      </div>
      <div
        onClick={() => setShowDelConfirm(old => !old)}
        class="hidden group-hover:block text-xs text-gray-600 hover:cursor-pointer"
      >
        Del
      </div>
      <Show when={showDelConfirm()} fallback={null}>
        <div
          onClick={() => deleteTag(props.tag.id)}
          class="hidden group-hover:block text-xs text-red-600 hover:cursor-pointer"
        >
          Confirm
        </div>
      </Show>
    </div>
  );
};

export default Tag;
