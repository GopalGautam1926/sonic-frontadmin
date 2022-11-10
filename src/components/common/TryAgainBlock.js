import React from "react";
import { Card } from "@material-ui/core";
import AppButton from "../AppButton/AppButton";

const TryAgainBlock = ({ containerStyle, onClickTryAgain, message }) => {
  return (
    <Card
      style={{
        color: "red",
        minHeight: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:'column',
        padding: 5,
        ...containerStyle,
      }}
    >
      {message && (
        <div style={{ marginBottom: 10 }}>
          <p>{message}</p>
        </div>
      )}
      <AppButton color="danger" onClick={onClickTryAgain}>
        Try again
      </AppButton>
    </Card>
  );
};

export default TryAgainBlock;
