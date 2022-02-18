/**
 * This custom hook is the reactive bridge between the UI components 
 * and the scoring services pipeline.
 */
import { useState, useEffect } from "react";
import { loadLayersModel, LayersModel } from "@tensorflow/tfjs";

import TokenizationService from "../services/tokenization/TokenizationService";
import SyllableCountService from "../services/syllableCount/SyllableCountService";
import FleshReadingEaseService from "../services/readability/scales/fleschReadingEase/FleshReadingEaseService";

import ItextFeatures from "../types/interfaces/ItextFeatures";

type model = LayersModel | null;
interface Scoring {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  running: boolean;
}

const { tokenizeToWords, tokenizeToSentences } = TokenizationService;
const { countSyllables } = SyllableCountService;
const { fkGradeLevel } = FleshReadingEaseService;

function useScore(): Scoring {
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [model, setModel] = useState<model>(null);
  const [running, setRunning] = useState<boolean>(false);

  /* load/unload the neural network model */
  useEffect(() => {
    async function loadModel(): Promise<void> {
      const MODEL_PUBLIC_DIR = `${process.env.PUBLIC_URL}/neuralNet/model.json`;
      const model: LayersModel = await loadLayersModel(MODEL_PUBLIC_DIR);
      setModel(model);
    }
    loadModel().catch((error) => console.log(error));
    return () => setModel(null);
  }, []);

  /* recompute the score on text change, and toggle loader */
  useEffect(() => {
    async function computeScore(model: model, text: string): Promise<void> {
      try {
        if (model && text) {
          setRunning(true);
          const tokenizing: Promise<string[]>[] = [
            tokenizeToSentences(text),
            tokenizeToWords(text),
          ];
          const [sentences, words]: string[][] = await Promise.all(tokenizing);
          const countPredInput = { words, model };
          const totNumWords: number = words.length;
          const totNumSentences: number = sentences.length;
          const totNumSyllables: number = await countSyllables(countPredInput);
          const textFeatures: ItextFeatures = Object.freeze({
            totNumWords,
            totNumSentences,
            totNumSyllables,
          });
          const fkGradeLevelScore: number = fkGradeLevel(textFeatures);
          setScore(fkGradeLevelScore);
          setRunning(false);
        } else {
          setScore(Infinity);
          setRunning(false);
        }
      } catch (error) {
        setScore(Infinity);
        setRunning(false);
      }
    }
    const timeoutId = setTimeout(() => computeScore(model, text), 300);
    return () => clearTimeout(timeoutId);
  }, [text, model]);

  return { text, setText, score, setScore, running };
}

export default useScore;
