import { useState, useEffect } from "react";

import { loadLayersModel, LayersModel } from "@tensorflow/tfjs";

import TokenizationService from "../services/tokenization/TokenizationService";
import SyllableCountService from "../services/syllableCount/SyllableCountService";

const { tokenizeToWords, tokenizeToSentences } = TokenizationService;
const { countSyllables } = SyllableCountService;

type model = LayersModel | null;

interface ItextFeatures {
  totNumWords: number;
  totNumSentences: number;
  totNumSyllables: number;
}

function useScore() {
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [model, setModel] = useState<model>(null);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    async function loadModel(): Promise<void> {
      const MODEL_PUBLIC_DIR = `${process.env.PUBLIC_URL}/neuralNet/model.json`;
      const model: LayersModel = await loadLayersModel(MODEL_PUBLIC_DIR);
      setModel(model);
    }
    loadModel().catch((error) => console.log(error));
    return () => setModel(null);
  }, []);

  useEffect(() => {
    const DEFAULT_SCORE = Infinity;

    function fkGradeLevel(textFeatures: ItextFeatures): number {
      const { totNumWords, totNumSentences, totNumSyllables } = textFeatures;
      if (totNumWords > 0 && totNumSentences > 0) {
        const fkGradeLevelScore: number =
          206.835 -
          1.015 * (totNumWords / totNumSentences) -
          84.6 * (totNumSyllables / totNumWords);
        return fkGradeLevelScore;
      } else {
        return DEFAULT_SCORE;
      }
    }

    async function computeScore(model: model, text: string): Promise<void> {
      if (model && text) {
        setRunning(true);
        console.time("computing score");
        console.time("tokenization");
        const tokenizing: Promise<string[]>[] = [
          tokenizeToSentences(text),
          tokenizeToWords(text),
        ];
        const [sentences, words]: string[][] = await Promise.all(tokenizing);
        console.timeEnd("tokenization");

        const countPredInput = { words, model };
        const totNumWords: number = words.length;
        const totNumSentences: number = sentences.length;
        console.time("syllable counting");
        const totNumSyllables: number = await countSyllables(countPredInput);
        console.timeEnd("syllable counting");

        const textFeatures: ItextFeatures = Object.freeze({
          totNumWords,
          totNumSentences,
          totNumSyllables,
        });

        console.time("formula application");
        const fkGradeLevelScore: number = fkGradeLevel(textFeatures);
        console.timeEnd("formula application");
        setScore(fkGradeLevelScore);
        console.timeEnd("computing score");
        setRunning(false);
      } else {
        setScore(DEFAULT_SCORE);
        setRunning(false);
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
