import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Ifile } from "../../../../types/interfaces/Ifile";

interface Props {
  setFileUpload: React.Dispatch<React.SetStateAction<Ifile>>;
}

function readDroppedFile(file: File): Promise<Ifile> {
  const reader = new FileReader();
  reader.readAsText(file);
  return new Promise((resolve, reject) => {
    reader.onabort = () => reject("file reading was aborted");
    reader.onerror = () => reject("file reading has failed");
    reader.onload = () => {
      const fileRead: Ifile = {
        name: file.name,
        content: `${reader.result}`,
      };
      resolve(fileRead);
    };
  });
}

function RSfileDrop(props: Props): JSX.Element {
  const { setFileUpload } = props;
  const onDrop = useCallback(
    (acceptedFiles: File[]): void => {
      acceptedFiles.forEach(async (file) => {
        try {
          const fileRead: Ifile = await readDroppedFile(file);
          setFileUpload(fileRead);
        } catch (error) {
          console.error("Failed to read dropped file");
          setFileUpload({ name: "", content: "" });
        }
      });
    },
    [setFileUpload]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Box padding={1} borderRadius={5} border="dashed 5px gray">
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Grid
                container
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                   Drop file 
                </Grid>
                <Grid item>
                 (.txt)
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Box>
  );
}

export default RSfileDrop;
