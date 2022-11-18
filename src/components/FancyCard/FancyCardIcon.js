import { Card } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useTheme } from "@material-ui/core/styles";

export default function FancyCardIcon({
  children,
  color = "primary",
  style,
  ...props
}) {
  const theme = useTheme();
  return (
    <Card
      style={{
        ...style,
        width: 78,
        height: 78,
        textAlign: "center",
        lineHeight: "78px",
        backgroundColor: theme.palette.background.dark1,
        color: theme.palette.primary.main,
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
