import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import ExternalLink from "../link/ExternalLink";

function Copyright(): JSX.Element {
  const currentYear: number = new Date().getFullYear();
  return (
    <ExternalLink href="https://www.frederickroman.com">
      <Typography variant="subtitle2">
        &copy; Frederick Roman {currentYear}
      </Typography>
    </ExternalLink>
  );
}

function About(): JSX.Element {
  return <Typography variant="subtitle2">About</Typography>;
}

function Footer(): JSX.Element {
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

export default Footer;
