import HeroBanner from "../components/banner/HeroBanner";
import IntroDemoSection from "../components/content/home/IntroDemoSection";
import ReadscaleDemo from "../components/readScale/ReadscaleDemo";

function Home(): JSX.Element {
  return (
    <main>
      <HeroBanner />
      <IntroDemoSection />
      <ReadscaleDemo />
    </main>
  );
}

export default Home;
