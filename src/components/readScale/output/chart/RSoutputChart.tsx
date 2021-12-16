import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FleshReadingEaseService from "../../../../services/readability/scales/fleschReadingEase/FleshReadingEaseService";

interface Props {
  blank: boolean;
  score: number;
  running: boolean;
}

const { scoreToUSschoolLevel } = FleshReadingEaseService;

function mapValueToColor(value: number): string {
  if (value < 33) return "green";
  else if (value < 66) return "goldenrod";
  else return "red";
}

function RSoutputChart(props: Props): JSX.Element {
  const { blank, score, running } = props;
  const chartValue = blank ? 0 : 100 - Math.min(Math.max(0, score), 100);
  const chartBorderColor = blank ? "gray" : mapValueToColor(chartValue);
  const chartCenterCaption = blank
    ? "ReadGauge"
    : running
    ? "Calculating..."
    : scoreToUSschoolLevel(score).scoreSchoolLevel;
  return (
    <Box
      position="relative"
      display="inline-flex"
      ml={5}
      border={3}
      borderColor={chartBorderColor}
      borderRadius="50%"
    >
      <CircularProgress
        variant="determinate"
        size={180}
        value={chartValue}
        style={{ color: mapValueToColor(chartValue) }}
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
          fontSize="1.1em"
        >
          {chartCenterCaption}
        </Typography>
      </Box>
    </Box>
  );
}

export default RSoutputChart;
