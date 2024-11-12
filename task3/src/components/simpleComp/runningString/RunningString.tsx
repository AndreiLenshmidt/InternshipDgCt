import { Fragment } from "react/jsx-runtime";
import "./running.scss";

export default function RunningString(prop: {
  runningText: JSX.Element;
  className: string;
}) {
  return (
    <div className={prop.className}>
      <div className="runnig-string__box">
        {"123456789012345678".split("").map((_, index) => (
          <Fragment key={index}>{prop.runningText}</Fragment>
        ))}
      </div>
    </div>
  );
}
