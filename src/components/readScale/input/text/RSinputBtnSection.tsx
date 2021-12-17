import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function RSinputBtnSection(props: Props): JSX.Element {
  const { setText } = props;

  const handleClick = (): void => setText("");

  return (
    <Box m={1}>
      <IconButton
        name="clear"
        aria-label="delete"
        onClick={handleClick}
        size="large"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export default RSinputBtnSection;
