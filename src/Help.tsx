import { Component } from 'solid-js';
import Logo from '../src/bulb.svg';

const Help: Component = () => {
  const Instruction = (props: { left: string; right: string }) => {
    return (
      <div class="flex flex-row justify-between mb-4">
        <p class="font-bold">{props.left}</p>
        <p class="italic">{props.right}</p>
      </div>
    );
  };

  return (
    <div class="max-w-2xl mt-4 md:mt-12 mx-auto px-4">
      <div class="flex flex-row gap-4 items-center">
        <Logo class="w-12 h-12" />
        <h1 class="text-2xl font-bold tracking-tight">jour</h1>
      </div>
      <p class="mt-4">A tiny, opinionated lab journal application.</p>
      <p class="md:hidden mt-4 text-red-600">
        Best enjoyed on a larger screen and with keyboard input, sorry!
      </p>
      <p class="mt-4 mb-10">
        You're already in the application, press <b>h</b> to toggle the help screen!
      </p>
      <Instruction left="h" right="Show help screen" />
      <Instruction left="f" right="Show feedback screen" />
      <Instruction left="c" right="Show configuration screen" />
      <Instruction left="n" right="New journal entry" />
      <Instruction left="t" right="New auto tag" />
      <Instruction left="s" right="Synchronize state with remote if configured" />
      <Instruction left="arrow up" right="Select previous auto tag" />
      <Instruction left="arrow down" right="Select next auto tag" />

      <h2 class="text-xl font-semibold mt-12">S3 synchronization and backup</h2>
      <p class="mt-4 pb-10">
        In the configuration of this app, you can add an endpoint and credentials for an
        S3 provider. If this is provided, the application will synchronize the local state
        with the S3 bucket after creating new entries, or pressing <b>s</b>.
      </p>
    </div>
  );
};

export default Help;
