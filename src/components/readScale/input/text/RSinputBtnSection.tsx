import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface IProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function RSinputBtnSection(props: IProps): JSX.Element {
  const { setText } = props;

  const handleClick = (): void => setText("");

  return (
    <IconButton name="clear" aria-label="delete" onClick={handleClick} size="large">
      <DeleteIcon />
    </IconButton>
  );
}

export default RSinputBtnSection;
