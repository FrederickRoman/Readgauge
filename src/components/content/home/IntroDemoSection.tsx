import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { brown } from "@mui/material/colors";

const useStyles = makeStyles({
  section: {
    fontSize: "clamp(1em, 5vw, 1.5em)",
    background: brown[50],
  },
  feature: {
    paddingBlock: "min(5vh, 5em)",
  },
});

function IntroDemoSection(): JSX.Element {
  const classes = useStyles();
  return (
    <Box component="section" p={5} className={classes.section}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <p className={classes.feature}>
            <b> It calculates the US school reading level of a text.</b>
          </p>
          <p className={classes.feature}>
            <b>It uses Neuro-Flesh</b> which is a neural version of the flesch
            scoring system created for this app.
          </p>
          <p className={classes.feature}>
            <b>It's private</b> because all calculations get done in-brower and
            nothing gets ever sent to a server.
          </p>
        </Grid>
      </Grid>
    </Box>
  );
}

export default IntroDemoSection;
