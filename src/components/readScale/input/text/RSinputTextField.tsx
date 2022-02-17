import TextField from "@mui/material/TextField";

interface IProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function RSinputTextField(props: IProps): JSX.Element {
  const { text, setText } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changedText = event.target.value;
    setText(changedText);
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        label="Write text here"
        multiline
        rows={8}
        value={text}
        onChange={handleChange}
        variant="outlined"
        style={{ width: "max(150px, 25vw - 10px)" }}
        id="main-demo_input-text-field"
        data-testid="demo_input_text-field"
      />
    </form>
  );
}

export default RSinputTextField;
