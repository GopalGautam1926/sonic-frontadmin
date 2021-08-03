import React from "react";
import { Grid } from "@material-ui/core";
import AppButton from "../../AppButton/AppButton";
import { Container } from "@material-ui/core";
import RDialog from "../../rcomponents/RDialog/RDialog";
import AddIcon from "@material-ui/icons/Add";
import { useTheme } from "@material-ui/core/styles";

export default function TableActions({
  refreshButtonProps,
  addButtonProps,
  openDialogWhenClickAdd = true,
  componentInsideDialog,
}) {
  const theme = useTheme();
  return (
    <Grid container spacing={1}>
      <Grid item>
        <AppButton {...refreshButtonProps}>Refresh</AppButton>
      </Grid>
      <Grid item>
        {openDialogWhenClickAdd ? (
          <RDialog.CustomDialog
            anchorElement={
              <AppButton color="success">
                <AddIcon />
              </AppButton>
            }
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth={true}
            maxWidth="lg"
            scroll="body"
            PaperProps={{
              style: {
                minHeight: "60vh",
                padding: 5,
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            {({ close }) => {
              var componentInsideDialogMoreProps = React.cloneElement(
                componentInsideDialog,
                { closeDialog: close }
              );
              return (
                <Container maxWidth="lg">
                  {/* <componentInsideDialog  closeDialog={close}/> */}
                  {componentInsideDialogMoreProps}
                </Container>
              );
            }}
          </RDialog.CustomDialog>
        ) : (
          <AppButton color="success" {...addButtonProps}>
            <AddIcon />
          </AppButton>
        )}
      </Grid>
    </Grid>
  );
}
