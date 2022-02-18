import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { Ifile } from "../../../../types/interfaces/Ifile";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
});

interface IRSfileUploadProps {
  setFileUpload: React.Dispatch<React.SetStateAction<Ifile>>;
}

interface IeventTargetWithOptionalResult extends EventTarget {
  result?: string;
}

function RSfileUpload(props: IRSfileUploadProps) {
  const { setFileUpload } = props;
  const classes = useStyles();

  const handleFile = (e: ProgressEvent) => {
    const target: IeventTargetWithOptionalResult | null = e.target;
    if (target !== null) {
      const DEFAULT_CONTENT = "";
      const content: string = target?.result ?? DEFAULT_CONTENT;
      setFileUpload((fileUpload) => ({ ...fileUpload, content }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files![0];
    if (file !== null) {
      const fileData = new FileReader();
      fileData.onloadend = handleFile;
      fileData.readAsText(file);
      const { name } = file;
      setFileUpload((fileUpload) => ({ ...fileUpload, name }));
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <input
          accept=".txt"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<FolderOpenIcon />}
            style={{ textTransform: "none" }}
          >
            Open file
          </Button>
        </label>
      </Grid>
    </Grid>
  );
}

export default RSfileUpload;
