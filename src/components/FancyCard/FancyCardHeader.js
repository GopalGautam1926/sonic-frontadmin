import {
  CardHeader,
  Paper,
  Card
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import useStyle from "./styles";
import { useTheme } from "@material-ui/core/styles";
import classNames from "classnames";
import { log } from "../../utils/app.debug";

export default function FancyCardHeader({
  children,
  color = "primary",
  className,
  icon,
  style,
  ...props
}) {
  const classes = useStyle();
  const theme = useTheme();

  if (icon) {
    return (
      <Paper
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "transparent",
          boxShadow:'none',
          ...style
        }}
      >
        {typeof(children)=="function" ? children(classes) : children}
      </Paper>
    );
  }

  return (
    <Paper
    style={{
      padding:10, 
      background: theme.palette[color]?.main,
      ...style
    }}
    >
      {typeof(children)=="function" ? children(classes) : children}
    </Paper>
  );
}

FancyCardHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
    "purple"
  ]),
  plain: PropTypes.bool,
  stats: PropTypes.bool,
  icon: PropTypes.bool,
  children: PropTypes.node,
  ...CardHeader.propTypes,
};
