import { createStore } from 'solid-js/store';

export const [ephemeralStore, setEphemeralStore] = createStore<{
  showToast?: boolean;
  new?: [number, number];
  dropped?: [number, number];
}>({});
