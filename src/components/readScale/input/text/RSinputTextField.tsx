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
        id="outlined-multiline-static"
        label="Write text here"
        multiline
        rows={4}
        value={text}
        onChange={handleChange}
        variant="outlined"
      />
    </form>
  );
}

export default RSinputTextField;
