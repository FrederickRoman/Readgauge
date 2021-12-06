import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FleshReadingEaseService from "../../../../services/readability/scales/fleschReadingEase/FleshReadingEaseService";

interface IProps {
  score: number;
  running: boolean;
}

const { scoreToUSschoolLevel } = FleshReadingEaseService;

function CircularProgressWithLabel(
  props: CircularProgressProps & { score: number; running: boolean }
) {
  const { score, running } = props;
  const value = 100 - Math.min(Math.max(0, score), 100);
  const { scoreSchoolLevel } = scoreToUSschoolLevel(score);

  return (
    <Box
      position="relative"
      display="inline-flex"
      ml={5}
      style={{ border: "3px solid green", borderRadius: "50%" }}
    >
      <CircularProgress variant="determinate" size={180} value={value} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
          style={{ fontSize: "1.3em" }}
        >
          {running ? "Calculating..." : scoreSchoolLevel}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularStatic(props: IProps) {
  const { score, running } = props;

  return <CircularProgressWithLabel score={score} running={running} />;
}
