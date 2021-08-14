import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import RStextInput from "./text/RStextInputSection";
import RSfileUpload from "./file/RSfileInputSection";

interface IProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function RSinputSection(props: IProps): JSX.Element {
  const { text, setText } = props;
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box component="span" m={5}>
            <RStextInput
              text={text}
              setText={setText}
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
