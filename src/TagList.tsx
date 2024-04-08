import { Component, createSignal, For, onCleanup, Show } from 'solid-js';
import { tinykeys } from 'tinykeys';
import { validateEvent } from './utils';
import { useStore } from './store';
import { Tag as TagType } from './types';
import Tag from './Tag';

const TagList: Component = () => {
  const [state, { addNewTag }] = useStore();
  const [newTagMode, setNewTagMode] = createSignal(false);
  const [newTagName, setNewTagName] = createSignal('');

  let inputRef;

  const onEdit = () => {
    setNewTagMode(true);
    inputRef?.focus();
  };

  const cleanup = tinykeys(window, {
    t: validateEvent(onEdit),
    Escape: () => setNewTagMode(false),
  });

  onCleanup(cleanup);

  const onEditEnd = event => {
    event?.preventDefault();

    const tagId = addNewTag(newTagName());
    setNewTagMode(false);
  };

  const tags = () => state.tags?.filter(tag => !tag.deletedAt) ?? [];

  return (
    <div class="flex overflow-y-auto overflow-x-hidden truncate pt-16 m-2">
      <div class="w-full">
        <For each={tags()}>{(tag: TagType) => <Tag tag={tag} />}</For>
        <Show when={newTagMode()}>
          <form onSubmit={onEditEnd}>
            <input
              class="rounded-sm focus:outline-none"
              ref={inputRef}
              type="text"
              onInput={event => setNewTagName(event?.currentTarget.value)}
            />
          </form>
        </Show>
      </div>
    </div>
  );
};

export default TagList;
