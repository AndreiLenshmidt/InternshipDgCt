import { useGame } from "../appContext/appContext";

export default function TimeView() {
  const time = useGame().time;
  const min = Math.floor(time / 60);
  const sec = time - min * 60;
  return (
    <span className="time">
      {min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}
    </span>
  );
}
