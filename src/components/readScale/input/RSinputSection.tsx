import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import RStextInput from "./text/RStextInputSection";
import RSfileUpload from "./file/RSfileInputSection";

function RSinputSection() {
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box component="span" m={5}>
            <RStextInput />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box component="span" m={5}>
            <RSfileUpload />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RSinputSection;
