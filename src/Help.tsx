import { Component } from 'solid-js';

const Help: Component = () => {
  const Instruction = props => {
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
        // Icon
        <h1 class="text-2xl font-bold tracking-tight">rest.quest</h1>
      </div>
      <p class="mt-4">A tiny, opinionated todo list application.</p>
      <p class="md:hidden mt-4 text-red-600">
        Best enjoyed on a larger screen and with keyboard input, sorry!
      </p>
      <p class="mt-4 mb-10">
        You're already in the application, press <b>h</b> to toggle the help screen!
      </p>
      <Instruction left="h" right="Show help screen" />
      <Instruction left="f" right="Show feedback screen" />
      <Instruction left="p" right="New project" />
      <Instruction left="n" right="New quest in the current project" />
      <Instruction left="click on quest" right="Check off quest" />
      <Instruction left="c" right="Show configuration screen" />
      <Instruction left="s" right="Synchronize state with remote if configured" />
      <Instruction left="v" right="Cycle views of quests" />
      <Instruction left="arrow up" right="Select previous project" />
      <Instruction left="arrow down" right="Select next project" />
      <Instruction left="ctrl+e" right="Compact selected project" />
      <Instruction left="b y e" right="Purge all local data" />

      <h2 class="text-xl font-semibold mt-12">S3 synchronization and backup</h2>
      <p class="mt-4 pb-10">
        In the configuration of this app, you can add an endpoint and credentials for an
        S3 provider. If this is provided, the application will synchronize the local state
        with the S3 bucket after creating new quests, or pressing <b>s</b>.
      </p>
    </div>
  );
};

export default Help;
