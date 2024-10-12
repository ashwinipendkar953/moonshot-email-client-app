import { formatDate } from "../helpers/formatDate";

const DateComponent = ({ timestamp }) => {
  const { day, month, year, hours, minutes, ampm } = formatDate(timestamp);

  return (
    <p className="date mb-0">
      {`${day}/${month}/${year} ${hours}:${minutes}`}
      <small>{ampm}</small>
    </p>
  );
};

export default DateComponent;
