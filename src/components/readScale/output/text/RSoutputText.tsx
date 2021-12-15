import { Box } from "@mui/system";
import FleshReadingEaseService from "../../../../services/readability/scales/fleschReadingEase/FleshReadingEaseService";

interface IProps {
  blank: boolean;
  score: number;
}

const { scoreToUSschoolLevel } = FleshReadingEaseService;

function RSoutputText(props: IProps): JSX.Element {
  const { blank, score } = props;
  const outputText = blank
    ? "Score will be shown here"
    : scoreToUSschoolLevel(score).scoreSchoolDescription;
  return (
    <Box height={50} ml={5}>
      {outputText}
    </Box>
  );
}

export default RSoutputText;
