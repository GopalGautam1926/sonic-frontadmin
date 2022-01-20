import { CardContent, CircularProgress } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card } from "@material-ui/core";
import React from "react";
import Loading from "./Loading";
import TryAgainBlock from "./TryAgainBlock";

export default function DataFetchingStateComponent({
  error,
  onClickTryAgain,
  loading,
  children,
  loadingComponentprops,
  loadingComponent
}) {
  if (error) {
    return (
      <TryAgainBlock
        message={error?.message || "Oh snap! You got an error!"}
        onClickTryAgain={onClickTryAgain}
      />
    );
  }
  if (loading) {
    return loadingComponent || <Loading {...loadingComponentprops} />;
  }
  return children;
}
