import useScore from "../hooks/useScore";
import RSinputSection from "../components/readScale/input/RSinputSection";
import RSoutputSection from "../components/readScale/output/RSoutputSection";
import RSfileInputSection from "../components/readScale/input/file/RSfileInputSection";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Home(): JSX.Element {
  const { text, setText, score, running } = useScore();
  return (
    <>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box component="span" m={5}>
              <RSinputSection text={text} setText={setText} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box component="span" m={5}>
              <RSoutputSection score={score} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <RSfileInputSection />
      <div> {running ? "running" : "idle"}</div>
    </>
  );
}

export default Home;
