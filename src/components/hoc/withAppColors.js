import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@material-ui/core/styles";
export default function withAppColor(WrappedComponent) {
  return ({ style,color="primary", ...props }) => {
    const theme = useTheme();
    return (
      <WrappedComponent
        style={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          ...style,
        }}
        {...props}
      />
    );
  };
}
