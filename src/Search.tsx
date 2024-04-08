import { Component, onCleanup } from 'solid-js';
import { tinykeys } from 'tinykeys';
import { validateEvent } from './utils';
import { useStore } from './store';

export type SearchProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const Search: Component<SearchProps> = (props: SearchProps) => {
  const [state] = useStore();

  let searchInputRef;

  const cleanup = tinykeys(window, {
    Escape: () => {
      searchInputRef.blur();
    },
    '$mod+k': validateEvent(() => {
      searchInputRef.focus();
    }),
  });

  onCleanup(cleanup);

  return (
    <form onSubmit={event => event.preventDefault()} class="w-2/3 flex flex-col mb-12">
      <input
        type="text"
        ref={searchInputRef}
        class="focus:outline-none text-md placeholder:font-thin block focus:ring-0"
        placeholder=""
        autofocus
        value={props.searchTerm}
        onInput={event => {
          props.setSearchTerm(event?.currentTarget?.value);
        }}
      />
    </form>
  );
};

export default Search;
