import RSoutputChart from "./chart/RSoutputChart";
import RSoutputText from "./text/RSoutputText";

import Grid from "@mui/material/Grid";

interface IProps {
  score: number;
  running: boolean;
}

function RSoutputSection(props: IProps): JSX.Element {
  const { score, running } = props;

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <RSoutputChart score={score} running={running}/>
      </Grid>
      <Grid item>
        <RSoutputText score={score} />
      </Grid>
    </Grid>
  );
}

export default RSoutputSection;
