import useReadabilityReducer from "../hooks/useReadabilityReducer";

import RSinputSection from "../components/readScale/input/RSinputSection";
import RSoutputSection from "../components/readScale/output/RSoutputSection";

import { useState } from "react";
import { useEffect } from "react";

import * as tf from "@tensorflow/tfjs";
import useScore from "../hooks/useScore";

function Home(): JSX.Element {
  const [readability, readabilityDispatch] = useReadabilityReducer();
  // const [text, setText] = useState<string>("");
  // const [score, setScore] = useState<number>(0);
  // const [model, setModel] = useState<tf.LayersModel | null>(null);

  const { text, setText, score, setScore } = useScore();

  // useEffect(() => {
  //   async function loadModel() {
  //     const ROOT_DIR = "http://localhost:3000";
  //     const MODEL_PUBLIC_DIR: string = `${ROOT_DIR}/neuralNet/model.json`;
  //     const model: tf.LayersModel = await tf.loadLayersModel(MODEL_PUBLIC_DIR);
  //     setModel(model);
  //   }
  //   loadModel();
  // }, []);

  // useEffect(() => {
  //   console.log("text");
  //   console.log(text);
  // }, [text]);

  return (
    <>
      <RSinputSection
        text={text}
        setText={setText}
        readability={readability}
        readabilityDispatch={readabilityDispatch}
      />
      <RSoutputSection score={score} />
    </>
  );
}

export default Home;
