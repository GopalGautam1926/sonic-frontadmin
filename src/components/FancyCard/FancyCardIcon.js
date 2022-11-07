import { Card } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import useStyle from "./styles";
import { useTheme } from "@material-ui/core/styles";

export default function FancyCardIcon({
  children,
  color = "primary",
  style,
  ...props
}) {
  const classes = useStyle();
  const theme = useTheme();
  return (
    <Card
      style={{
        ...style,
        width: 78,
        height: 78,
        textAlign: "center",
        lineHeight: "78px",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette[color]?.contrastText,
      }}
      {...props}
    >
      {children}
    </Card>
  );
}

FancyCardIcon.propTypes = {
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
    "purple",
  ]),
  children: PropTypes.node,
  ...Card.propTypes,
};
