import logo from "../../assets/img/logo.svg";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function BannerTextSection(): JSX.Element {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Box p={1}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <img src={logo} alt="readgauge logo" width="60" height="60" />
            </Grid>
            <Grid item>
              <span style={{ color: "white" , fontSize:"2em"}}>Readgauge</span>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <Box px={1}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <h2
                style={{
                  color: "white",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                AI-powered reading level scoring app
              </h2>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default BannerTextSection;
