import { Grid, Radio } from "@material-ui/core";
import React, { useState } from "react";
import AppButton from "../../../../components/AppButton/AppButton";
import AppTextInput from "../../../../components/AppTextInput/AppTextInput";
import FancyCard from "../../../../components/FancyCard/FancyCard";
import { SwitchWithLabel } from "../../../../components/Switch/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import DatePicker from "../../../../components/DatePicker/DatePicker";
import KeyValue from "../../../../components/KeyValue/KeyValue";
import apikeysHttps from "../../../../services/https/resources/apikeys.https";
import { toast } from "react-toastify";
import { RadioGroup, FormControlLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { FormLabel } from "@material-ui/core";
import { useTheme } from "@material-ui/core";

const initialApiKey = {
  customer: "",
  type: "Individual",
  groups: [],
  company: "",
  validity: new Date(),
  disabled: false,
  metaData: {},
};
export default function AddApiKey({ closeDialog }) {
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [state, setState] = useState({
    loading: false,
  });
  const theme = useTheme();

  const onSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    apikeysHttps
      .createNewApiKey(apiKey)
      .then(({ data }) => {
        setState({ ...state, loading: false });
        setApiKey(initialApiKey);
        toast.success("Created successfully");
        closeDialog?.();
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
          <FancyCard.CardHeader color="success">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>
                  Create New Api Key
                </h4>
                <p className={headerClasses.cardCategoryWhite}>
                  Add new api key
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <form onSubmit={onSubmit}>
          <FancyCard.CardContent>
            <Grid container className="mb-3">
              <FormControl component="fieldset">
                <FormLabel component="legend">Api key type</FormLabel>
                <RadioGroup
                  aria-label="type"
                  name="type"
                  value={apiKey.type}
                  onChange={(e) => {
                    const type = e.target.value;
                    setApiKey({
                      ...apiKey,
                      type: type,
                      customer: "",
                      company: "",
                      groups: [],
                    });
                  }}
                  required
                >
                  <FormControlLabel
                    value="Individual"
                    control={<Radio />}
                    label="Individual"
                    style={{color: theme.palette.primary.contrastText}}
                  />
                  <FormControlLabel
                    value="Company"
                    control={<Radio />}
                    label="Company"
                    style={{color: theme.palette.primary.contrastText}}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6}>
                {apiKey.type === "Individual" && (
                  <AppTextInput
                    labelText="User Id"
                    id="customer"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      id: "customer",
                      required: true,
                      placeholder: "User Id for this api key",
                      value: apiKey.customer,
                      onChange: (e) =>
                        setApiKey({ ...apiKey, customer: e.target.value }),
                    }}
                  />
                )}

                {apiKey.type === "Company" && (
                  <AppTextInput
                    labelText="Company Id"
                    id="company"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      id: "company",
                      placeholder: "Company Id for this api key",
                      value: apiKey.company,
                      onChange: (e) =>
                        setApiKey({ ...apiKey, company: e.target.value }),
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <DatePicker
                  required={true}
                  label="Validity"
                  selected={new Date(apiKey.validity)}
                  onChange={(date) => setApiKey({ ...apiKey, validity: date })}
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
                  checked={apiKey.disabled}
                  onChange={(e) =>
                    setApiKey({ ...apiKey, disabled: e.target.checked })
                  }
                />
              </Grid>
            </Grid>

            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <InputLabel style={{ marginTop: 5 }}>
                  Metadata (Key/Value)
                </InputLabel>
              </Grid>
              <Grid item>
                <KeyValue
                  data={apiKey.metaData}
                  onChangeData={(newData) => {
                    setApiKey({ ...apiKey, metaData: newData });
                  }}
                  containerStyle={{ marginTop: 5 }}
                />
              </Grid>
            </Grid>
          </FancyCard.CardContent>

          <FancyCard.CardActions>
            <AppButton color="danger" onClick={() => closeDialog?.()}>
              Close
            </AppButton>
            <AppButton
              type="submit"
              loadingText="Creating.."
              loading={state.loading}
            >
              Create
            </AppButton>
          </FancyCard.CardActions>
        </form>
      </FancyCard>
    </div>
  );
}
