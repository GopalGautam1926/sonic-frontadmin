import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import AppButton from "../../AppButton/AppButton";
import { Container } from "@material-ui/core";
import RDialog from "../../rcomponents/RDialog/RDialog";
import AddIcon from "@material-ui/icons/Add";
import { useTheme } from "@material-ui/core/styles";
import CountryDropDown from "../../AppTextInput/CountryDropDown";
import StatusDropDown from "../../AppTextInput/StatusDropDown";
import { useStore } from "../../../stores";

const initialRadioStation = {
  country: "",
  status: "",
};

export default function TableActions({
  refreshButtonProps,
  search,
  addButtonProps,
  openDialogWhenClickAdd = true,
  componentInsideDialog,
}) {
  const theme = useTheme();
  const [radio, setRadioStation] = useState(initialRadioStation);
  const { radioStationStore } = useStore();



  return (
    <Grid container spacing={1} style={{display:"flex",alignItems:"center"}}>
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
      {search &&<Grid item xs={12} sm={3} md={3}>
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
      </Grid>}
      {search && <Grid item >
        <AppButton onClick={()=>{
          radioStationStore.SearchByCountryAndStatus({country:radio.country,status:radio.status})
        }}>Search</AppButton>
      </Grid>}
    </Grid>
  );
}
