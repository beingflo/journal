import { Match, Switch, createSignal } from 'solid-js';

export const Feedback = () => {
  const [email, setEmail] = createSignal('');
  const [content, setContent] = createSignal('');
  const [notification, setNotification] = createSignal('');
  const [sending, setSending] = createSignal(false);
  const [disabledSend, setDisabledSend] = createSignal(false);

  const submit = async (event: any) => {
    event.preventDefault();
    setSending(true);

    setNotification('');
    const response = await fetch('https://feedback.marending.dev/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project: 'rest.quest',
        email: email(),
        content: content(),
        path: '',
      }),
    })
      .then(response => {
        setSending(false);
        return response;
      })
      .catch(error => {
        setNotification('failure');
        setSending(false);
        throw error;
      });

    if (response.status === 200) {
      setNotification('success');
      setDisabledSend(true);
    } else if (response.status === 429) {
      setNotification('slow-down');
    } else {
      setNotification('failure');
    }
  };

  return (
    <div class="max-w-2xl mx-auto mt-16">
      <form class="border border-black dark:border-white bg-white dark:bg-zinc-800 p-2 flex flex-col gap-2 left-2 md:left-auto shadow-[8px_8px_0_rgba(0,0,0,0.15)] dark:shadow-[8px_8px_0_rgba(256,256,256,0.3)]">
        <span class="mb-2 font-semibold">Feedback</span>
        <p class="mb-2 text-gray-600 dark:text-gray-200 text-sm">
          Found a typo or want to let me know something?
          <br />
          Shoot me a quick message, it's much appreciated!
        </p>
        <label class="block">
          <span class="text-sm text-gray-700 dark:text-gray-200 mb-1">
            Email (optional)
          </span>
          <input
            type="text"
            name="content"
            onChange={e => setEmail(e.target.value)}
            class="block w-full border border-gray-900 dark:border-gray-200 dark:bg-zinc-800 p-0.5"
          />
        </label>
        <label class="block">
          <span class="text-sm text-gray-700 dark:text-gray-200 mb-1">Message</span>
          <textarea
            name="content"
            onChange={e => setContent(e.target.value)}
            class="block resize w-full h-24 border border-gray-900 dark:border-gray-200 dark:bg-zinc-800 p-0.5"
          />
        </label>
        <div class="flex flex-row justify-end items-center">
          <button
            class={`border border-black dark:border-white py-1 px-2 ${
              disabledSend() && 'text-gray-400 border-gray-400'
            }`}
            disabled={disabledSend()}
            onClick={submit}
          >
            Send
          </button>
        </div>
      </form>
      <div class="mt-8 flex flex-row justify-end p-2">
        <Switch>
          <Match when={notification() === 'success'}>
            <p class="text-green-800 dark:text-green-200">Thanks!</p>
          </Match>
          <Match when={notification() === 'failure'}>
            <p class="text-rose-800 dark:text-rose-200">Something went wrong :(</p>
          </Match>
          <Match when={notification() === 'slow-down'}>
            <p class="text-rose-800 dark:text-rose-200">Slow down :)</p>
          </Match>
          <Match when={sending() && notification() === ''}>
            <p class="text-black">Sending...</p>
          </Match>
        </Switch>
      </div>
    </div>
  );
};
