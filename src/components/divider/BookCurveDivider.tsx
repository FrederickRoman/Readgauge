import { makeStyles } from "@mui/styles";
interface Props {
  place: "top" | "bottom";
}
const useStyles = makeStyles({
  curve_container: {
    top: 0,
    left: 0,
    width: "100%",
    overflow: "hidden",
    lineHeight: 0,
    transform: "rotate(180deg)",
  },
  svg_top: {
    position: "relative",
    display: "block",
    width: "calc(100% + 1.3px)",
    height: 50,
    background: "#fafafa",
  },
  path_top: {
    fill: "#EFEBE9",
  },
  svg_bottom: {
    position: "relative",
    display: "block",
    width: "calc(100% + 1.3px)",
    height: 50,
    background: "#EFEBE9",
  },
  path_bottom: {
    fill: "#fafafa",
  },
});

function BookCurveDivider(props: Props): JSX.Element {
  const { place } = props;
  const classes = useStyles();
  return (
    <div className={classes.curve_container}>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={place === "top" ? classes.svg_top : classes.svg_bottom}
      >
        <path
          d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
          className={place === "top" ? classes.path_top : classes.path_bottom}
        ></path>
      </svg>
    </div>
  );
}

export default BookCurveDivider;
