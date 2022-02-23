import React from "react";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import RPopover from "../RPopover";

export default function RDownloadConfirm({
  anchorElement,
  anchorElementContainerStyle,
  message = "Message to user here",
  onClickDownload = () => {},
  onClickCopyLink = () => {},
  title,
  maxWidth = "md",
  contentStyle,
  footerStyle,
  severity = "error",
  closeOnButtonClicked = true,
  yesButtonProps,
  noButtonProps,
  alertProps,
  yesText,
  noText,
  paperStyle,
  buttons = [
    {
      label: yesText || "Download",
      onClick: onClickDownload,
      style: { backgroundColor: "#198754" },
      props: yesButtonProps,
    },
    {
      label: noText || "Copy link",
      onClick: onClickCopyLink,
      style: { backgroundColor: "#fd7e14" },
      props: { ...noButtonProps },
    },
  ],
  ...props
}) {

  return (
    <RPopover
      anchorElement={anchorElement}
      paperStyle={{padding:0,...paperStyle}}
      maxWidth={maxWidth}
      {...props}
    >
      {({ handleClose }) => (
        <>
          <DialogContent style={{ padding: 0, ...contentStyle }}>
            <Alert>
              <AlertTitle>{title}</AlertTitle>
              {message}
            </Alert>
          </DialogContent>
          {buttons.length > 0 && (
            <DialogActions style={{...footerStyle }}>
              {buttons.map((btn, index) => {
                return (
                  <Button
                    key={index}
                    onClick={() => {
                      btn.onClick &&
                        typeof btn.onClick == "function" &&
                        btn.onClick();
                      if (closeOnButtonClicked) {
                        handleClose();
                      }
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ ...btn.style }}
                    {...btn.props}
                  >
                    {btn.label}
                  </Button>
                );
              })}
            </DialogActions>
          )}
        </>
      )}
    </RPopover>
  );
}
