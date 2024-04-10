import { Component } from 'solid-js';

export type DateProps = {
  date?: number;
};

const DateDisplay: Component<DateProps> = (props: DateProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-CH', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(props.date));

  return (
    <p
      class="text-sm font-light text-center col-span-1"
      title={props.date && formattedDate}
    >
      {props.date ? formattedDate : 'never'}
    </p>
  );
};

export default DateDisplay;
