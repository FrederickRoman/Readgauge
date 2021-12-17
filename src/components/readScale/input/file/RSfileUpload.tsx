import React from "react";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { Ifile } from "../../../../types/interfaces/Ifile";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        // margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  })
);

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
          // value={value}
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

      {/* <div> {fileUpload.name}</div> */}
      {/* <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label> */}
    </Grid>
  );
}

export default RSfileUpload;
