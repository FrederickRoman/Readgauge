import { ReactNode } from "react";
import { Link } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
  href: string;
  children: ReactNode;
}

const useStyles = makeStyles({
  link_undecorated: {
    color: "white",
    textDecoration: "none",
  },
});

function ExternalLink(props: Props): JSX.Element {
  const { href, children } = props;
  const classes = useStyles();
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      className={classes.link_undecorated}
    >
      {children}
    </Link>
  );
}

export default ExternalLink;
