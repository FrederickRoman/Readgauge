import useScore from "../hooks/useScore";
import RSinputSection from "../components/readScale/input/RSinputSection";
import RSoutputSection from "../components/readScale/output/RSoutputSection";

function Home(): JSX.Element {
  const { text, setText, score, running } = useScore();
  return (
    <>
      <RSinputSection text={text} setText={setText} />
      <RSoutputSection score={score} />
      <div> {running ? "running" : "idle"}</div>
    </>
  );
}

export default Home;
