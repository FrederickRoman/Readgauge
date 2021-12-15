import RSoutputChart from "./chart/RSoutputChart";
import RSoutputText from "./text/RSoutputText";

import Grid from "@mui/material/Grid";

interface IProps {
  blank: boolean;
  score: number;
  running: boolean;
}

function RSoutputSection(props: IProps): JSX.Element {
  const { blank, score, running } = props;

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flexBasis="auto"
    >
      <Grid item>
        <RSoutputChart blank={blank} score={score} running={running} />
      </Grid>
      <Grid item>
        <RSoutputText blank={blank}  score={score} />
      </Grid>
    </Grid>
  );
}

export default RSoutputSection;
