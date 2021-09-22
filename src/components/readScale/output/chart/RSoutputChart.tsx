import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FleshReadingEaseService from "../../../../services/readability/scales/fleschReadingEase/FleshReadingEaseService";

interface IProps {
  score: number;
}

const { scoreToUSschoolLevel } = FleshReadingEaseService;

function CircularProgressWithLabel(
  props: CircularProgressProps & { score: number }
) {
  const { score } = props;
  const value = 100 - Math.min(Math.max(0, score), 100);
  const { scoreSchoolLevel } = scoreToUSschoolLevel(score);

  return (
    <Box
      position="relative"
      display="inline-flex"
      style={{ border: "3px solid green", borderRadius: "50%" }}
    >
      <CircularProgress
        variant="determinate"
        size={256}
        value={value}
        {...props}
      />
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
          {scoreSchoolLevel}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularStatic(props: IProps) {
  const { score } = props;

  return <CircularProgressWithLabel score={score} />;
}
