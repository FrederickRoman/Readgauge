import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import RStextInput from "./text/RStextInputSection";
import RSfileUpload from "./file/RSfileInputSection";

interface IProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function RSinputSection(props: IProps): JSX.Element {
  const { text, setText } = props;
  return <RStextInput text={text} setText={setText} />;
}

export default RSinputSection;
