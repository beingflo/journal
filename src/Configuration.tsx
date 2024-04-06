import { Component, createSignal, Show } from 'solid-js';
import { useStore } from './store';

const Configuration: Component = () => {
  const [state, { setS3Config }] = useStore();

  const [endpoint, setEndpoint] = createSignal(state?.s3?.endpoint ?? '');
  const [region, setRegion] = createSignal(state?.s3?.region ?? '');
  const [apiKey, setApiKey] = createSignal(state?.s3?.apiKey ?? '');
  const [apiSecretKey, setApiSecretKey] = createSignal(state?.s3?.apiSecretKey ?? '');
  const [saved, setSaved] = createSignal(false);

  const onSubmit = event => {
    event.preventDefault();
    setS3Config({
      endpoint: endpoint(),
      region: region(),
      apiKey: apiKey(),
      apiSecretKey: apiSecretKey(),
    });
    setSaved(true);
  };

  return (
    <div class="max-w-md mt-12 mx-auto">
      <form class="grid grid-cols-1 gap-6" onSubmit={onSubmit}>
        <label class="block">
          <span class="text-sm text-gray-700">S3 Endpoint</span>
          <input
            type="text"
            class="focus:outline-none mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 placeholder-gray-400 focus:border-gray-400 focus:ring-0"
            placeholder="Enter an S3 endpoint"
            value={endpoint()}
            onChange={event => setEndpoint(event?.currentTarget?.value)}
          />
        </label>
        <label class="block">
          <span class="text-sm text-gray-700">S3 Region</span>
          <input
            type="text"
            class="focus:outline-none mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 placeholder-gray-400 focus:border-gray-400 focus:ring-0"
            placeholder="Enter an S3 region"
            value={region()}
            onChange={event => setRegion(event?.currentTarget?.value)}
          />
        </label>
        <label class="block">
          <span class="text-sm text-gray-700">API Access Key</span>
          <input
            type="password"
            class="focus:outline-none mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 placeholder-gray-400 focus:border-gray-400 focus:ring-0"
            placeholder="Enter the API access key"
            value={apiKey()}
            onChange={event => setApiKey(event?.currentTarget?.value)}
          />
        </label>
        <label class="block">
          <span class="text-sm text-gray-700">API Secret Key</span>
          <input
            type="password"
            class="focus:outline-none mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 placeholder-gray-400 focus:border-gray-400 focus:ring-0"
            placeholder="Enter the API secret key"
            value={apiSecretKey()}
            onChange={event => setApiSecretKey(event?.currentTarget?.value)}
          />
        </label>
        <button
          type="submit"
          class="mt-8 rounded-sm bg-white border border-black py-2
                    uppercase text-black hover:bg-gray-100
                    hover:shadow-none focus:outline-none"
        >
          <div class="relative">
            <Show when={saved()} fallback={<span>Save</span>}>
              <span>Saved</span>
            </Show>
          </div>
        </button>
      </form>
    </div>
  );
};

export default Configuration;
