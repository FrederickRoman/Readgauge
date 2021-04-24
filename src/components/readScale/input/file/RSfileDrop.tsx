import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function RSfileDrop() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file:any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        // console.log(e.target.result);
      };
    //   console.log(file)
    //   reader.readAsArrayBuffer(file);
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}

export default RSfileDrop;
