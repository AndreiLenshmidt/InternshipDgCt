import "./tags.css";

export default function TagsComp(prop: {
  tags: Array<string>;
  ulClassName: string;
  liClassName: string;
  color?: string;
}) {
  return (
    <ul className={prop.ulClassName}>
      <li
        className={`${prop.liClassName} ${prop.liClassName}_active ${
          prop.color + "-bkg"
        }`}
      >
        {prop.tags?.[0]}
      </li>
      {prop.tags?.slice(1).map((item, index) => (
        <li
          className={`${prop.liClassName} ${prop.color + "-color"}`}
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
