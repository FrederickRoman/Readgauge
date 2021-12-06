import { Box } from "@mui/system";
import FleshReadingEaseService from "../../../../services/readability/scales/fleschReadingEase/FleshReadingEaseService";

interface IProps {
  score: number;
}

const { scoreToUSschoolLevel } = FleshReadingEaseService;

function RSoutputText(props: IProps): JSX.Element {
  const { score } = props;
  const { scoreSchoolDescription } = scoreToUSschoolLevel(score);

  return <Box ml={5}>{scoreSchoolDescription}</Box>;
}

export default RSoutputText;
