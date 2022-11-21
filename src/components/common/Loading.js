import { CardContent, CircularProgress } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card } from "@material-ui/core";
import React from "react";
import { useTheme } from "@material-ui/core";

export default function Loading({
  contectContainerStyle,
  elevation,
  message,
  typographyProps,
  progressbarProps,
  style,
  ...props
}) {
  const theme = useTheme();

  return (
    <Card
      elevation={elevation}
      style={{
        ...style,
        color: theme.palette.secondary.main,
        background: theme.palette.background.dark3,
      }}
      {...props}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
          ...contectContainerStyle,
        }}
      >
        <CircularProgress color="secondary" {...progressbarProps} />
        <Typography {...typographyProps}>
          {message || "Please wait..."}
        </Typography>
      </CardContent>
    </Card>
  );
}
