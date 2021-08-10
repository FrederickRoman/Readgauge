import { useState, useEffect } from "react";

import { loadLayersModel, LayersModel } from "@tensorflow/tfjs";

import TokenizationService from "../services/tokenization/TokenizationService";
import SyllableCountService from "../services/syllableCount/SyllableCountService";

const { wordTokenize, sentenceTokenize } = TokenizationService;
const { countSyllablesM } = SyllableCountService;

interface ItextFeatures {
  totNumWords: number;
  totNumSentences: number;
  totNumSyllables: number;
}

function useScore() {
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [model, setModel] = useState<LayersModel | null>(null);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    async function loadModel() {
      const ROOT_DIR: string = "http://localhost:3000";
      const MODEL_PUBLIC_DIR: string = `${ROOT_DIR}/neuralNet/model.json`;
      const model: LayersModel = await loadLayersModel(MODEL_PUBLIC_DIR);
      setModel(model);
    }
    loadModel();
    return () => setModel(null);
  }, []);

  useEffect(() => {
    const DEFAULT_SCORE = Infinity;

    function fkGradeLevel(textFeatures: ItextFeatures): number {
      const { totNumWords, totNumSentences, totNumSyllables } = textFeatures;
      if (totNumWords > 0 && totNumSentences > 0) {
        // const fkGradeLevelScore: number =
        //   0.39 * (totNumWords / totNumSentences) +
        //   11.8 * (totNumSyllables / totNumWords) -
        //   15.59;
        // return fkGradeLevelScore;
        const fkGradeLevelScore: number =
          206.835 -
          1.015 * (totNumWords / totNumSentences) -
          84.6 * (totNumSyllables / totNumWords);
        return fkGradeLevelScore;
      } else {
        return DEFAULT_SCORE;
      }
    }

    async function computeScore(model: LayersModel | null, text: string) {
      if (model) {
        if (text) {
          setRunning(true);
          console.time("sentence tokenization");
          const sentences: string[] = await sentenceTokenize(text);
          console.timeEnd("sentence tokenization");
          console.time("word tokenization");
          const words: string[] = await wordTokenize(text);
          console.timeEnd("word tokenization");
          console.time("syllable counting");
          const totNumWords: number = words.length;
          const totNumSentences: number = sentences.length;
          const totNumSyllables: number = await countSyllablesM(words, model);
          const textFeatures: ItextFeatures = Object.freeze({
            totNumWords,
            totNumSentences,
            totNumSyllables,
          });
          console.timeEnd("syllable counting");
          const fkGradeLevelScore: number = fkGradeLevel(textFeatures);
          setScore(fkGradeLevelScore);
          setRunning(false);
        } else setScore(DEFAULT_SCORE);
      }
    }

    computeScore(model, text).catch((error) => console.log(error));
  }, [text, model]);

  useEffect(() => {
    console.log("score---");
    console.log(score);
  }, [score]);

  return { text, setText, score, setScore, running };
}

export default useScore;
