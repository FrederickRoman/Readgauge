import FleshReadingEaseService from "../../../../services/readability/scales/fleschReadingEase/FleshReadingEaseService";

interface IProps {
  score: number;
}

const { scoreToUSschoolLevel } = FleshReadingEaseService;

function RSoutputText(props: IProps): JSX.Element {
  const { score } = props;
  const { scoreSchoolDescription } = scoreToUSschoolLevel(score);

  return <div>{scoreSchoolDescription}</div>;
}

export default RSoutputText;
