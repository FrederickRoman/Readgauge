import HeroBanner from "../components/banner/HeroBanner";
import IntroDemoSection from "../components/content/home/IntroDemoSection";
import ReadscaleDemo from "../components/readScale/ReadscaleDemo";
import { Grid } from "@mui/material";

function Home(): JSX.Element {
  return (
    <main>
      <Grid container flexDirection="column">
        <Grid item>
          <HeroBanner />
        </Grid>
        <Grid item>
          <IntroDemoSection />
        </Grid>
        <Grid item>
          <ReadscaleDemo />
        </Grid>
      </Grid>
    </main>
  );
}

export default Home;
