import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import { createStyles, makeStyles } from "@mui/styles";

import logo from "../../assets/img/logo.svg";

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      color: "white",
      textDecoration: "none",
    },
    title: {
      color: "white",
    },
  })
);

function HomeLink(): JSX.Element {
  const classes = useStyles();
  return (
    <Box>
      <Link to="/" className={classes.link} aria-label="home">
        <Button>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <img src={logo} alt="readgauge logo" width="40" height="40" />
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                Readguage
              </Typography>
            </Grid>
          </Grid>
        </Button>
      </Link>
    </Box>
  );
}

function AboutLink(): JSX.Element {
  return (
    <Box>
      <Link to="/about">
        <IconButton size="medium" aria-label="about">
          <HelpIcon color="secondary" />
        </IconButton>
      </Link>
    </Box>
  );
}

function MainBar(): JSX.Element {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <HomeLink />
          </Grid>
          <Grid item>{/* <AboutLink /> */}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default MainBar;
