import HeroBanner from "../components/banner/HeroBanner";
import IntroDemoSection from "../components/content/home/IntroDemoSection";
import ReadscaleDemo from "../components/readScale/ReadscaleDemo";


function Home(): JSX.Element {
  return (
    <>
      <HeroBanner />
      <IntroDemoSection />
 
      <ReadscaleDemo />
    </>
  );
}

export default Home;
