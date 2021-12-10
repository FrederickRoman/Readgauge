import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { makeStyles } from "@mui/styles";
import logo from "../../assets/img/logo.svg";

const useStyles = makeStyles({
  link: {
    color: "white",
    textDecoration: "none",
  },
  title: {
    color: "white",
    textTransform: "none",
  },
});

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
                ReadGuage
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
        <IconButton
          size="medium"
          aria-label="about"
          sx={{ color: "background.paper" }}
        >
          <HelpIcon />
        </IconButton>
      </Link>
    </Box>
  );
}

function MainNavBar(): JSX.Element {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <HomeLink />
          </Grid>
          <Grid item>
            <AboutLink />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default MainNavBar;
