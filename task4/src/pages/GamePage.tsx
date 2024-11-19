import BottomInfo from "../components/BottomInfo";
import CardComp from "../components/CardComp";
import TopInfo from "../components/TopInfo";

export default function GamePage() {
  return (
    <section className="game">
      <TopInfo />
      <div className="wrap">
        <div className="game__card-box">
          {"123456789".split("").map((_, index) => (
            <CardComp key={index} />
          ))}
        </div>
      </div>
      <BottomInfo />
    </section>
  );
}
