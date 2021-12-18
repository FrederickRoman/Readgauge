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

function SyllablesPredDemo(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [model, setModel] = useState<LayersModel | null>(null);
  const [probs, setProbs] = useState<number[][]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const changedText = event.target.value;
    setText(changedText);
  };

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
    function predictWordSyllableCount(word: string): number[][] {
      const MAX_NUM_OF_CHARS: number = 33;
      const LENGTH_OF_CHAR_ENCODING: number = 5;
      const INPUT_LENGTH: number = MAX_NUM_OF_CHARS * LENGTH_OF_CHAR_ENCODING;
      const INPUT_SIZE: [number, number] = [1, INPUT_LENGTH];
      if (model) {
        return tidy(() => {
          const encodedWord: number[] = Preprocessing.memoWordEncoder(word);
          const inputTensor: Tensor2D = tensor2d(encodedWord, INPUT_SIZE);
          const outputTensor = model.predict(inputTensor) as Tensor2D;
          const outputArray = outputTensor.arraySync() as number[][];
          return outputArray;
        });
      } else return [];
    }
    const probs: number[][] = predictWordSyllableCount(text);
    setProbs(probs);
  }, [text, model]);

  return (
    <Grid container flexDirection="column">
      <Grid item>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-multiline-static"
            label="Write word here"
            variant="outlined"
            type="search"
            value={text}
            onChange={handleChange}
          />
        </Box>
      </Grid>
      <Grid item>
        <pre>{JSON.stringify(probs, null, " ")}</pre>
      </Grid>
    </Grid>
  );
}

export default SyllablesPredDemo;
