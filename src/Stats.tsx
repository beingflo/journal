import * as Plot from '@observablehq/plot';
import { useStore } from './store';
import { Entry } from './types';

const getWeek = (date: Date): number => {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));

  return Math.ceil(days / 7);
};

const entriesByDay = (entries: Array<Entry>) => {
  return entries.reduce((prev: Record<string, number>, d) => {
    const day = new Date(d.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

    if (prev[day]) {
      prev[day] += 1;
    } else {
      prev[day] = 1;
    }
    return prev;
  }, {});
};

export const Stats = () => {
  const [state] = useStore();

  const entriesFrequency = Object.entries(entriesByDay(state.entries))?.map(
    ([date, entries]) => ({
      date: new Date(date),
      entries,
    }),
  );

  return (
    <div class="max-w-2xl mx-auto mt-16">
      <div class="p-2 flex flex-col gap-2 left-2 md:left-auto">
        {Plot.plot({
          x: { axis: null, domain: [...Array(52).keys()].map(x => x + 1) },
          y: {
            tickFormat: Plot.formatWeekday('en', 'narrow'),
            tickSize: 0,
          },
          fy: { tickFormat: '' },
          color: { scheme: 'Cividis', type: 'log', legend: true, ticks: 6 },
          aspectRatio: 0.8,
          marks: [
            Plot.cell(entriesFrequency, {
              x: d => getWeek(d.date),
              y: d => d.date.getDay(),
              fill: 'entries',
              fy: d => d.date.getFullYear(),
            }),
          ],
        })}
      </div>
    </div>
  );
};
