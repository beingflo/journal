import { Component } from 'solid-js';
import { StoreProvider } from './store';
import App from './App';

const Bootstrap: Component = () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
};

export default Bootstrap;
