import Grid from "@mui/material/Grid";
import RSoutputChart from "./chart/RSoutputChart";
import RSoutputText from "./text/RSoutputText";

interface Props {
  blank: boolean;
  score: number;
  running: boolean;
}

function RSoutputSection(props: Props): JSX.Element {
  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flexBasis="auto"
    >
      <Grid item>
        <RSoutputChart {...props} />
      </Grid>
      <Grid item>
        <RSoutputText {...props} />
      </Grid>
    </Grid>
  );
}

export default RSoutputSection;
