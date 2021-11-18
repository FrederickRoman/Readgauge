import RStextInput from "./text/RStextInputSection";

interface IProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function RSinputSection(props: IProps): JSX.Element {
  const { text, setText } = props;
  return <RStextInput text={text} setText={setText} />;
}

export default RSinputSection;
