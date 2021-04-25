import useReadabilityReducer from "../hooks/useReadabilityReducer";

import RSinputSection from "../components/readScale/input/RSinputSection";

function Home():JSX.Element {
  const [readability, readabilityDispatch] = useReadabilityReducer();

  return (
    <RSinputSection
      readability={readability}
      readabilityDispatch={readabilityDispatch}
    />
  );
}

export default Home;
