import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import RStextInput from "./text/RStextInputSection";
import RSfileUpload from "./file/RSfileInputSection";

import IReadabilityState from "../../../types/interfaces/IReadabilityState";
import ReadabilityActionType from "../../../types/unions/ReadabilityActionType";

interface IRSinputSectionProps {
  readability: IReadabilityState;
  readabilityDispatch: React.Dispatch<ReadabilityActionType>;
}

function RSinputSection(props: IRSinputSectionProps): JSX.Element {
  const { readability, readabilityDispatch } = props;
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box component="span" m={5}>
            <RStextInput
              readability={readability}
              readabilityDispatch={readabilityDispatch}
            />
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
