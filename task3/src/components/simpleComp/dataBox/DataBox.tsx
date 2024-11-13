import "./databox.scss";

export default function DataBox(prop: {
  boxClassName: string;
  iconClassName: string;
  spanClassName: string;
  date: string;
  duration: string;
}) {
  return (
    <div className={prop.boxClassName}>
      <svg
        className={prop.iconClassName}
        width={17}
        height={17}
        viewBox="0 0 17 17"
      >
        <use xlinkHref="#calendar"></use>
      </svg>
      <span className={prop.spanClassName}>{prop.date}</span>
      <svg className={prop.iconClassName} viewBox="0 0 17 17">
        <use xlinkHref="#clock"></use>
      </svg>
      <span className={prop.spanClassName}>{prop.duration}</span>
    </div>
  );
}
