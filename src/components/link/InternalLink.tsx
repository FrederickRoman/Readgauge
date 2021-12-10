import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

interface Props {
  to: string;
  children: ReactNode;
}

const useStyles = makeStyles({
  link_undecorated: {
    color: "white",
    textDecoration: "none",
  },
});

function InternalLink(props: Props): JSX.Element {
  const { to, children } = props;
  const classes = useStyles();
  return (
    <Link to={to} className={classes.link_undecorated}>
      {children}
    </Link>
  );
}

export default InternalLink;
