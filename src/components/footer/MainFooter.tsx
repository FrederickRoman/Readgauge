import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import ExternalLink from "../link/ExternalLink";
import InternalLink from "../link/InternalLink";

function Copyright(): JSX.Element {
  const currentYear: number = new Date().getFullYear();
  return (
    <ExternalLink to="https://www.frederickroman.com">
      <Typography variant="subtitle2">
        &copy; Frederick Roman {currentYear}
      </Typography>
    </ExternalLink>
  );
}

function About(): JSX.Element {
  return (
    <InternalLink to="/about">
      <Typography variant="subtitle2">About</Typography>
    </InternalLink>
  );
}

function MainFooter(): JSX.Element {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid item>
            <Copyright />
          </Grid>
          <Grid item>
            <About />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default MainFooter;
