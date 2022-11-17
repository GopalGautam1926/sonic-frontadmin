import React from "react";
import { Grid, MenuItem } from "@material-ui/core";
import AppButton from "../../AppButton/AppButton";
import { Container } from "@material-ui/core";
import RDialog from "../../rcomponents/RDialog/RDialog";
import AddIcon from "@material-ui/icons/Add";
import { useTheme } from "@material-ui/core/styles";
import ReportsDateRange from "../../../pages/ReportsManagement/components/ReportsDateRange";
import RPopover from "../../rcomponents/RPopover";

export default function TableActions({
  refreshButtonProps,
  addPlusFilter,
  filterOnly,
  filterButtonProps,
  openDialogFilter = false,
  componentInsideDialogFilter,
  addButtonProps,
  openDialogWhenClickAdd = false,
  componentInsideDialog,
  dateRange = false,
  exportData = false,
  handleExport,
  ...props
}) {
  const theme = useTheme();

  return (
    <Grid container spacing={1} style={{ display: "flex", alignItems: "center" }}>
      <Grid item>
        <AppButton {...refreshButtonProps}>Refresh</AppButton>
      </Grid>

      {filterOnly || addPlusFilter ?
        <Grid item>
          {openDialogFilter ? (
            <RDialog.CustomDialog
              anchorElement={
                <AppButton >
                  FILTER
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
                  backgroundColor: theme.palette.background.dark3,
                },
              }}
            >
              {({ close }) => {
                var componentInsideDialogMoreProps = React.cloneElement(
                  componentInsideDialogFilter,
                  { closeDialog: close }
                );
                return (
                  <Container maxWidth="lg">
                    {componentInsideDialogMoreProps}
                  </Container>
                );
              }}
            </RDialog.CustomDialog>
          ) : (
            <AppButton {...filterButtonProps}>
              FILTER
            </AppButton>
          )}
        </Grid> : null}

      {!filterOnly || addPlusFilter ?
        <Grid item>
          {openDialogWhenClickAdd ? (
            <RDialog.CustomDialog
              anchorElement={
                <AppButton >
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
                  backgroundColor: theme.palette.background.dark3,
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
            <AppButton  {...addButtonProps}>
              <AddIcon />
            </AppButton>
          )}
        </Grid> : null}

      {exportData &&
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <RPopover
            paperStyle={{ minWidth: 100 }}
            TransitionProps={{
              // onExit: () => setState({ ...state, newUsernameOrId: "" }),
            }}
            anchorElement={
              <AppButton >
                EXPORT
              </AppButton>
            }
          >
            {({ handleClose }) => (
              <div>
                <MenuItem
                  value={"xlsx"}
                  onClick={() => {
                    handleClose();
                    handleExport("xlsx");
                  }}
                >
                  .xlsx file
                </MenuItem>
                <MenuItem
                  value={"csv"}
                  onClick={() => {
                    handleClose();
                    handleExport("csv");
                  }}
                >
                  .csv file
                </MenuItem>
              </div>
            )}
          </RPopover>
        </Grid>
      }

      {dateRange &&
        <Grid item xs={12} sm={6} md={8} style={{ zIndex: 999 }}>
          <ReportsDateRange
            startDate={props?.startDate}
            onChangeStartDate={props?.onChangeStartDate}
            endDate={props?.endDate}
            onChangeEndDate={props?.onChangeEndDate}
          />
        </Grid>
      }
    </Grid>
  );
}
