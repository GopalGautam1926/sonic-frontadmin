import React, { useState } from "react";
import { Grid, MenuItem } from "@material-ui/core";
import AppButton from "../../AppButton/AppButton";
import { Container } from "@material-ui/core";
import RDialog from "../../rcomponents/RDialog/RDialog";
import AddIcon from "@material-ui/icons/Add";
import { useTheme } from "@material-ui/core/styles";
import CountryDropDown from "../../AppTextInput/CountryDropDown";
import StatusDropDown from "../../AppTextInput/StatusDropDown";
import { useStore } from "../../../stores";
import ReportsDateRange from "../../../pages/ReportsManagement/components/ReportsDateRange";
import RPopover from "../../rcomponents/RPopover";
import CustomDropDown from "../../AppTextInput/CustomDropDown";

const initialRadioStation = {
  country: "",
  status: "",
  shortListed: true
};

export default function TableActions({
  refreshButtonProps,
  search,
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
  const [radio, setRadioStation] = useState(initialRadioStation);
  const { radioStationStore } = useStore();

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
                <AppButton color="warning">
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
                  backgroundColor: theme.palette.primary.main,
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
            <AppButton color="warning" {...filterButtonProps}>
              FILTER
            </AppButton>
          )}
        </Grid> : null}

      {!filterOnly || addPlusFilter ?
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
        </Grid> : null}

      {exportData &&
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <RPopover
            paperStyle={{ minWidth: 100 }}
            TransitionProps={{
              // onExit: () => setState({ ...state, newUsernameOrId: "" }),
            }}
            anchorElement={
              <AppButton color="purple">
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

      {search && <Grid item xs={12} sm={3} md={3}>
        <CountryDropDown
          labelText="Country"
          id="country"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            required: true,
            placeholder: "Country",
            value: radio.country,
            onChange: (e) =>
              setRadioStation({ ...radio, country: e.target.value }),
          }}
        />
      </Grid>}

      {/* {search && <Grid item xs={12} sm={3} md={3}>
        <StatusDropDown
          labelText="Status"
          id="status"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            required: true,
            placeholder: "Status",
            value: radio.status,
            onChange: (e) =>
              setRadioStation({ ...radio, status: e.target.value }),
          }}
        />
      </Grid>} */}

      {/* {
        search && <Grid item xs={12} sm={3} md={3}>
          <CustomDropDown
            labelText="Shortlisted"
            id="shortlisted"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              placeholder: "Shortlisted",
              value: radio?.shortListed,
              onChange: (e) =>
                setRadioStation({ ...radio, shortListed: e.target.value }),
            }}
            data={["true", "false"]}
          />
        </Grid>
      } */}

      {search && <Grid item >
        <AppButton onClick={() => {
          radioStationStore.SearchByCountryAndStatus({ country: radio.country, status: radio.status })
        }}>Search</AppButton>
      </Grid>}
    </Grid>
  );
}
