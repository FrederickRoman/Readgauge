import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

interface IProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function RSinputBtnSection(props: IProps): JSX.Element {
  const { setText } = props;

  const handleClick = (): void => setText("");

  return (
    <IconButton name="clear" aria-label="delete" onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  );
}

export default RSinputBtnSection;
