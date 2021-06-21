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

    if (model) {
      if (text) {
        const sentences: string[] = sentenceTokenize(text);
        const words: string[] = wordTokenize(text);
        const textFeatures: ItextFeatures = Object.freeze({
          totNumWords: words.length as number,
          totNumSentences: sentences.length as number,
          totNumSyllables: countSyllablesM(words, model) as number,
        });
        const fkGradeLevelScore: number = fkGradeLevel(textFeatures);
        setScore(fkGradeLevelScore);
      } else setScore(DEFAULT_SCORE);
    }
  }, [text, model]);

  useEffect(() => {
    console.log("score---");
    console.log(score);
  }, [score]);

  return { text, setText, score, setScore };
}

export default useScore;
