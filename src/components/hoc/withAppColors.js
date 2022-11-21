import React from "react";
import { useTheme } from "@material-ui/core/styles";
export default function withAppColor(WrappedComponent) {
  return ({ style, color, ...props }) => {
    const theme = useTheme();
    
    return (
      <WrappedComponent
        style={{
          backgroundColor:
            color === "success"
              ? theme.palette.secondary.main
              : theme.palette.background.dark3,
          color: theme.palette.primary.contrastText,
          ...style,
        }}
        {...props}
      />
    );
  };
}
