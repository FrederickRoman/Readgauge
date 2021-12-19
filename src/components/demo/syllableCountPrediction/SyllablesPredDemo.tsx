import { Box, Grid, TextField } from "@mui/material";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
  loadLayersModel,
  LayersModel,
  tensor2d,
  Tensor2D,
  tidy,
} from "@tensorflow/tfjs";
import Preprocessing from "../../../services/syllableCount/Preprocessing";
import SyllablesPredChart from "./chart/SyllablesPredChart";

function useSyllableCountDemo() {
  const [text, setText] = useState<string>("");
  const [model, setModel] = useState<LayersModel | null>(null);
  const [probs, setProbs] = useState<number[]>([]);

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
    function getWordFromText(text: string): string {
      const isLetter = (char: string): boolean => /^[a-zA-Z]+$/.test(char);
      const word = `${text}`.split("").filter(isLetter).join("");
      return word;
    }
    function predictWordSyllableCount(word: string): number[] {
      const MAX_NUM_OF_CHARS: number = 33;
      const LENGTH_OF_CHAR_ENCODING: number = 5;
      const INPUT_LENGTH: number = MAX_NUM_OF_CHARS * LENGTH_OF_CHAR_ENCODING;
      const INPUT_SIZE: [number, number] = [1, INPUT_LENGTH];
      if (word) {
        if (model) {
          return tidy(() => {
            const encodedWord: number[] = Preprocessing.memoWordEncoder(word);
            const inputTensor: Tensor2D = tensor2d(encodedWord, INPUT_SIZE);
            const outputTensor = model.predict(inputTensor) as Tensor2D;
            const outputArray = outputTensor.arraySync() as number[][];
            return outputArray.flat();
          });
        } else return Array(15).fill(1 / 15);
      } else return [1, ...Array(14).fill(0)];
    }
    const word: string = getWordFromText(text);
    const probs: number[] = predictWordSyllableCount(word);
    setProbs(probs);
  }, [text, model]);

  return { setText, probs };
}

function SyllablesPredDemo(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const { setText, probs } = useSyllableCountDemo();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const changedText = event.target.value;
    setValue(changedText);
    setText(changedText);
  };

  return (
    <Grid container flexDirection="column">
      <Grid item>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="syllable-pred-demo_text-field"
                label="Write word here"
                variant="outlined"
                type="search"
                helperText="one word only (e.g. cat)"
                value={value}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <SyllablesPredChart predProbs={probs} />
      </Grid>
    </Grid>
  );
}

export default SyllablesPredDemo;
