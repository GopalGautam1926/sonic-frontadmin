import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  CardActions,
  Divider,
  Paper,
  Box,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import useStyle from "./styles";
import { useTheme } from "@material-ui/core/styles";
import classNames from "classnames";
import { log } from "../../utils/app.debug";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

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
        height:78,
        textAlign: "center",
        lineHeight: "78px",
        backgroundColor: theme.palette[color]?.light,
        color:theme.palette[color]?.contrastText
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
    "purple"
  ]),
  children: PropTypes.node,
  ...Card.propTypes,
};
