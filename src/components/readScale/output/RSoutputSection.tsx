import RSoutputChart from "./chart/RSoutputChart";
import RSoutputText from "./text/RSoutputText";

interface IProps {
  score: number;
}

function RSoutputSection(props: IProps): JSX.Element {
  const { score } = props;

  return (
    <div>
      <RSoutputChart score={score} />
      <RSoutputText score={score} />
    </div>
  );
}

export default RSoutputSection;
