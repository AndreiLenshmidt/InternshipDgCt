export default function TagsComp(prop: {
  tags: Array<string>;
  ulClassName: string;
  liClassName: string;
}) {
  return (
    <ul className={prop.ulClassName}>
      <li className={`${prop.liClassName} ${prop.liClassName}_active`}>
        {prop.tags?.[0]}
      </li>
      {prop.tags?.slice(1).map((item, index) => (
        <li className={prop.liClassName} key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
}
