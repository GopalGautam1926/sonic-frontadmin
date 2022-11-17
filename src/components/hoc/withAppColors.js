import React from "react";
import {  useTheme } from "@material-ui/core/styles";
export default function withAppColor(WrappedComponent) {
  return ({ style,color="primary", ...props }) => {
    const theme = useTheme();
    return (
      <WrappedComponent
        style={{
          backgroundColor: theme.palette.background.dark2,
          color: theme.palette.primary.contrastText,
          ...style,
        }}
        {...props}
      />
    );
  };
}
