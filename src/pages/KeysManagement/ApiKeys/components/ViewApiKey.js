import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AppButton from "../../../../components/AppButton/AppButton";
import AppTextInput from "../../../../components/AppTextInput/AppTextInput";
import FancyCard from "../../../../components/FancyCard/FancyCard";
import { SwitchWithLabel } from "../../../../components/Switch/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import DatePicker from "../../../../components/DatePicker/DatePicker";
import KeyValue from "../../../../components/KeyValue/KeyValue";
import RSpace from "../../../../components/rcomponents/RSpace";
import { useParams, useLocation } from "react-router-dom";
import RPopconfirm from "../../../../components/rcomponents/RPopconfirm/RPopconfirm";
import apikeysHttps from "../../../../services/https/resources/apikeys.https";
import DataFetchingStateComponent from "../../../../components/common/DataFetchingStateComponent";
import { toast } from "react-toastify";
import {
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

export default function ViewApiKey({ closeDialog }) {
  const [state, setState] = useState({
    editMode: false,
    loading: true,
    editLoading: false,
    disableLoading: false,
    suspendLoading: false,
    error: null,
    oldKey: {},
  });
  let { apiId } = useParams();
  const location = useLocation();
  const [apiKey, setApiKey] = useState({
    _id: "",
    customer: "",
    validity: new Date(),
    disabled: false,
    suspended: false,
    metaData: {},
    company: ""
  });

  const getAndSetApiKey = async () => {
    try {
      setState({ ...state, loading: true, error: null });
      if (location?.state?.apiKey) {
        if (location.state.apiKey.customer) {
          location.state.apiKey.customer = location.state.apiKey.customer?._id
        }
        if (location.state.apiKey.company) {
          location.state.apiKey.company = location.state.apiKey.company?._id
        }
        setApiKey(location.state.apiKey);
        setState({ ...state, loading: false, oldKey: location.state.apiKey });
      } else {
        var { data } = await apikeysHttps.findByKey(apiId);
        if (data?.customer) {
          data.customer = data.customer._id
        }
        if (data?.company) {
          data.company = data.company._id
        }
        setApiKey(data);
        setState({ ...state, loading: false, oldKey: data });
      }
    } catch (error) {
      setState({ ...state, loading: false, error: error });
    }
  };

  useEffect(() => {
    getAndSetApiKey();
  }, [apiId]);

  const onUpdateSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, editLoading: true });
    apikeysHttps
      .updateApiKey(apiKey._id, apiKey)
      .then(({ data }) => {
        setState({
          ...state,
          editLoading: false,
          editMode: false,
          oldKey: data,
        });
        toast.success("Updated successfully");
      })
      .catch((err) => {
        setState({ ...state, editLoading: false });
        toast.error(err.message || "Error while creating..");
      });
  };

  const onUpdateWithState = (forState = "suspend") => {
    switch (forState) {
      case "suspend":
        setState({ ...state, suspendLoading: true });
        apikeysHttps
          .updateApiKey(apiKey._id, {
            suspended: !apiKey.suspended,
          })
          .then(({ data }) => {
            setState({
              ...state,
              suspendLoading: false,
              editMode: false,
              oldKey: data,
            });
            setApiKey(data);
            toast.success(data.suspended ? "suspended" : "unsuspended");
          })
          .catch((err) => {
            setState({ ...state, suspendLoading: false });
            toast.error(err.message || "Error while creating..");
          });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader color="success">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>Api Key</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  {apiId || "--"}
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <form onSubmit={onUpdateSubmit}>
          <FancyCard.CardContent>
            <DataFetchingStateComponent
              loading={state.loading}
              error={state.error}
              onClickTryAgain={() => getAndSetApiKey()}
            >
              <RSpace justifyContent="flex-end">
                {state.editMode && (
                  <RSpace.Item>
                    <AppButton
                      onClick={() => {
                        setState({ ...state, editMode: false });
                        setApiKey(state.oldKey);
                      }}
                      type="button"
                      color="warning"
                    >
                      Cancel
                    </AppButton>
                  </RSpace.Item>
                )}

                {state.editMode && (
                  <RSpace.Item>
                    <AppButton
                      loading={state.editLoading}
                      loadingText="Updating..."
                      type="submit"
                    >
                      Update
                    </AppButton>
                  </RSpace.Item>
                )}

                {!state.editMode && (
                  <RSpace.Item>
                    <AppButton
                      onClick={() => {
                        setState({ ...state, editMode: true });
                      }}
                      type={state.editMode ? "button" : "button"}
                    >
                      Edit
                    </AppButton>
                  </RSpace.Item>
                )}

                <RSpace.Item>
                  <RPopconfirm
                    anchorElement={
                      <AppButton
                        loading={state.suspendLoading}
                        color="danger"
                        type="button"
                      >
                        {apiKey.suspended ? "suspended" : "suspend"}
                      </AppButton>
                    }
                    onClickYes={() => onUpdateWithState("suspend")}
                    message={`Really want to ${apiKey.suspended ? "unsuspend" : "suspend"
                      } this api key?`}
                  />
                </RSpace.Item>
              </RSpace>
              <Grid container>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Are you</FormLabel>
                  <RadioGroup
                    aria-label="type"
                    name="type"
                    value={apiKey.type}
                    onChange={(e) =>
                      setApiKey({
                        ...apiKey,
                        type: e.target.value,
                        customer: "",
                        groups: [],
                      })
                    }
                    required
                  >
                    <FormControlLabel
                      value="Individual"
                      control={<Radio />}
                      label="Individual"
                      disabled={true}
                    />
                    <FormControlLabel
                      value="Company"
                      control={<Radio />}
                      label="Company"
                      disabled={true}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                  {apiKey.type == "Individual" && (
                    <AppTextInput
                      labelText="Customer Id or Sub"
                      id="customer"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        readOnly: true,
                        placeholder: "Customer id or sub for this api key",
                        value: apiKey.customer,
                        onChange: (e) =>
                          setApiKey({ ...apiKey, customer: e.target.value }),
                      }}
                    />
                  )}
                  {apiKey.type == "Company" && (
                    <AppTextInput
                      labelText="Company Id "
                      id="company"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        readOnly: true,
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
                    label="Validity"
                    selected={new Date(apiKey.validity)}
                    onChange={(date) =>
                      setApiKey({ ...apiKey, validity: date })
                    }
                    required={true}
                    disabled={!state.editMode}
                    inputProps={{
                      required: true,
                    }}
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
                    label="suspended"
                    disabled={!state.editMode}
                    checked={apiKey.suspended}
                    onChange={(e) =>
                      setApiKey({
                        ...apiKey,
                        suspended: e.target.checked,
                      })
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
                    disabled={!state.editMode}
                    containerStyle={{ marginTop: 5 }}
                  />
                </Grid>
              </Grid>
            </DataFetchingStateComponent>
          </FancyCard.CardContent>
        </form>
      </FancyCard>
    </div>
  );
}
