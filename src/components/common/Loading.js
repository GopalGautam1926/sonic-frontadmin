import { CardContent, CircularProgress } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card } from "@material-ui/core";
import React from "react";

export default function Loading({
  contectContainerStyle,
  elevation,
  message,
  typographyProps,
  progressbarProps,
  ...props
}) {
    return (
      <Card elevation={elevation} {...props}>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight:200,
            ...contectContainerStyle
          }}
        >
          <CircularProgress color="secondary" {...progressbarProps} />
          <Typography {...typographyProps}>{message||"Please wait..."}</Typography>
        </CardContent>
      </Card>
    );
}
