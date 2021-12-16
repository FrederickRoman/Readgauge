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

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file: File) => {
      try {
        const fileRead: Ifile = await readDroppedFile(file);
        setFileUpload(fileRead);
      } catch (error) {
        console.error(error);
        setFileUpload({ name: "", content: "" });
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Box padding={1} borderRadius={5} border="dashed 5px gray">
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <p> Drop file</p>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Box>
  );
}

export default RSfileDrop;
