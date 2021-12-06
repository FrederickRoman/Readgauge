import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function RSfileDrop() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        // console.log(e.target.result);
      };
      console.log(file);
      //   reader.readAsArrayBuffer(file);
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box margin={5}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Box padding={1} borderRadius={5} border="dashed 5px gray">
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <p> Drop files here</p>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Box>
  );
}

export default RSfileDrop;
