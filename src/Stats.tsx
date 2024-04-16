import * as Plot from '@observablehq/plot';
import { useStore } from './store';
import { Entry } from './types';

const getWeekNumber = (d: Date): number => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNo;
};

const getDay = (date: Date): number => {
  if (date.getDay() === 0) {
    return 7;
  }
  return date.getDay();
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
              x: d => getWeekNumber(d.date),
              y: d => getDay(d.date),
              fill: 'entries',
              fy: d => d.date.getFullYear(),
            }),
          ],
        })}
      </div>
    </div>
  );
};
