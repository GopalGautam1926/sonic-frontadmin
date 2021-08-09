import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import AppButton from "../../../../components/AppButton/AppButton";
import AppTextInput from "../../../../components/AppTextInput/AppTextInput";
import FancyCard from "../../../../components/FancyCard/FancyCard";
import { SwitchWithLabel } from "../../../../components/Switch/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import DatePicker from "../../../../components/DatePicker/DatePicker";
import KeyValue from "../../../../components/KeyValue/KeyValue";
import { log } from "../../../../utils/app.debug";
import licensekeysHttps from "../../../../services/https/resources/licensekeys.https";
import { toast } from "react-toastify";
import { useStore } from "../../../../stores";

const initialLicense = {
  name: "",
  maxEncodeUses: "",
  maxDecodeUses: 0,
  validity: new Date(),
  disabled: false,
  suspended: false,
  metaData: {},
};
export default function AddLicenseKey({ closeDialog }) {
  const [license, setLicense] = useState(initialLicense);
  const { licenseKeyStore } = useStore();
  const [state, setState] = useState({
    loading: false,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    licensekeysHttps
      .createNewLicense(license)
      .then(({ data }) => {
        setState({ ...state, loading: false });
        setLicense(initialLicense)
        toast.success("Created successfully");
        closeDialog?.()
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        toast.error(err.message || "Error while creating..");
      });
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader color="purple">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>
                  Create New License Key
                </h4>
                <p className={headerClasses.cardCategoryWhite}>
                  Add new license key
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <form onSubmit={onSubmit}>
          <FancyCard.CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} md={3}>
                <AppTextInput
                  labelText="Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    placeholder: "Name for this license key",
                    value: license.name,
                    onChange: (e) =>
                      setLicense({ ...license, name: e.target.value }),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <AppTextInput
                  labelText="Max Encode Uses"
                  id="max-encode-uses"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "number",
                    required: true,
                    min: "0",
                    placeholder: "eg. 1000",
                    value: license.maxEncodeUses,
                    onChange: (e) =>
                      setLicense({ ...license, maxEncodeUses: e.target.value }),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <AppTextInput
                  labelText="Max Decode Uses (Unused)"
                  id="max-decode-uses"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "number",
                    min: "0",
                    placeholder: "eg. 1000",
                    value: license.maxDecodeUses,
                    onChange: (e) =>
                      setLicense({ ...license, maxDecodeUses: e.target.value }),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <DatePicker
                  required={true}
                  label="Validity"
                  selected={new Date(license.validity)}
                  onChange={(date) =>
                    setLicense({ ...license, validity: date })
                  }
                  showYearDropdown
                  dateFormatCalendar="MMMM"
                  yearDropdownItemNumber={15}
                  scrollableYearDropdown
                  showMonthDropdown
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                <SwitchWithLabel
                  label="disabled"
                  checked={license.disabled}
                  onChange={(e) =>
                    setLicense({ ...license, disabled: e.target.checked })
                  }
                />
              </Grid>
              <Grid item>
                <SwitchWithLabel
                  label="suspended"
                  checked={license.suspended}
                  onChange={(e) =>
                    setLicense({ ...license, suspended: e.target.checked })
                  }
                />
              </Grid>
            </Grid>

            <InputLabel style={{ marginTop: 5 }}>
              Metadata (Key/Value)
            </InputLabel>
            <KeyValue
              data={license.metaData}
              onChangeData={(newData) => {
                setLicense({ ...license, metaData: newData });
              }}
              containerStyle={{ marginTop: 5 }}
            />
          </FancyCard.CardContent>

          <FancyCard.CardActions>
            <AppButton color="danger" onClick={() => closeDialog?.()}>
              Close
            </AppButton>
            <AppButton type="submit" loadingText="Creating.." loading={state.loading}>Create</AppButton>
          </FancyCard.CardActions>
        </form>
      </FancyCard>
    </div>
  );
}
