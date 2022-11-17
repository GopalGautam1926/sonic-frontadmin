import { useTheme } from "@material-ui/core";
import React from "react";
import Loading from "./Loading";
import TryAgainBlock from "./TryAgainBlock";

export default function DataFetchingStateComponent({
  error,
  onClickTryAgain,
  loading,
  children,
  loadingComponentprops,
  loadingComponent,
}) {
  const theme = useTheme();

  if (error) {
    return (
      <TryAgainBlock
        message={error?.message || "Oh snap! You got an error!"}
        onClickTryAgain={onClickTryAgain}
      />
    );
  }
  if (loading) {
    return (
      loadingComponent || (
        <Loading
          contectContainerStyle={{
            background: theme.palette.background.dark4,
            color: theme.palette.primary.contrastText,
          }}
          {...loadingComponentprops}
        />
      )
    );
  }
  return children;
}
