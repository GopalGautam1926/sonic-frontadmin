import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    link: {
      color: theme.palette.secondary.main,
    },
  })
);

export default function AppLink({ children, ...props }) {
  const classes = useStyles();
  return (
    <Link {...props} className={classes.link}>
      {children}
    </Link>
  );
}
