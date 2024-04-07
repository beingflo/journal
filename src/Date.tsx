import { Component } from 'solid-js';

export type DateProps = {
  date?: number;
};

const DateDisplay: Component<DateProps> = (props: DateProps) => {
  return (
    <p
      class="text-sm font-light text-center col-span-1"
      title={
        props.date &&
        new Intl.DateTimeFormat('en-CH', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date(props.date))
      }
    >
      {props.date
        ? new Intl.DateTimeFormat('en-CH', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(props.date))
        : 'never'}
    </p>
  );
};

export default DateDisplay;
