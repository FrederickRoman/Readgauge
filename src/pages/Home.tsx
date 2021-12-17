import { ErrorBoundary } from "react-error-boundary";
import { Grid } from "@mui/material";
import HeroBanner from "../components/banner/HeroBanner";
import IntroDemoSection from "../components/content/home/IntroDemoSection";
import ReadscaleDemo from "../components/readScale/ReadscaleDemo";
import AppFallback from "../components/fallback/AppFallback";

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
          <ErrorBoundary FallbackComponent={AppFallback}>
            <ReadscaleDemo />
          </ErrorBoundary>
        </Grid>
      </Grid>
    </main>
  );
}

export default Home;
