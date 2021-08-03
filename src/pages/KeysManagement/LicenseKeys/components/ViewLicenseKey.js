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
import licensekeysHttps from "../../../../services/https/resources/licensekeys.https";
import DataFetchingStateComponent from "../../../../components/common/DataFetchingStateComponent";
import { toast } from "react-toastify";

export default function ViewLicenseKey({ closeDialog }) {
  const [state, setState] = useState({
    editMode: false,
    loading: true,
    editLoading: false,
    disableLoading: false,
    suspendLoading: false,
    error: null,
    oldKey: {},
  });
  let { licenseId } = useParams();
  const location = useLocation();
  const [license, setLicense] = useState({
    name: "",
    key: "",
    maxEncodeUses: "",
    maxDecodeUses: "",
    validity: new Date(),
    disabled: false,
    suspended: false,
    metaData: {},
  });

  const getAndSetLicense = async () => {
    try {
      setState({ ...state, loading: true, error: null });
      if (location?.state?.license) {
        setLicense(location.state.license);
        setState({ ...state, loading: false, oldKey: location.state.license });
      } else {
        const { data } = await licensekeysHttps.findByKey(licenseId);
        setLicense(data);
        setState({ ...state, loading: false, oldKey: data });
      }
    } catch (error) {
      setState({ ...state, loading: false, error: error });
    }
  };

  useEffect(() => {
    getAndSetLicense();
  }, [licenseId]);

  const onUpdateSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, editLoading: true });
    licensekeysHttps
      .updateLicenseKey(license.key, license)
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

  const onUpdateWithState = (forState = "suspended") => {
    switch (forState) {
      case "suspended":
        setState({ ...state, suspendLoading: true });
        licensekeysHttps
          .updateLicenseKey(license.key, {
            suspended: !license.suspended,
          })
          .then(({ data }) => {
            setState({
              ...state,
              suspendLoading: false,
              editMode: false,
              oldKey: data,
            });
            setLicense(data);
            toast.success(data.suspended ? "Suspended" : "Unsuspended");
          })
          .catch((err) => {
            setState({ ...state, suspendLoading: false });
            toast.error(err.message || "Error while creating..");
          });
        break;

      case "disabled":
        setState({ ...state, disableLoading: true });
        licensekeysHttps
          .updateLicenseKey(license.key, {
            disabled: !license.disabled,
          })
          .then(({ data }) => {
            setState({
              ...state,
              disableLoading: false,
              editMode: false,
              oldKey: data,
            });
            setLicense(data);
            toast.success(data.disabled ? "Disabled" : "Enabled");
          })
          .catch((err) => {
            setState({ ...state, disableLoading: false });
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
          <FancyCard.CardHeader color="purple">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>License Key</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  {licenseId || "--"}
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
              onClickTryAgain={() => getAndSetLicense()}
            >
              <RSpace justifyContent="flex-end">
                {state.editMode && (
                  <RSpace.Item>
                    <AppButton
                      onClick={() => {
                        setState({ ...state, editMode: false });
                        setLicense(state.oldKey);
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
                        color="warning"
                        type="button"
                      >
                        {license.suspended ? "suspended" : "suspend"}
                      </AppButton>
                    }
                    onClickYes={() => onUpdateWithState("suspended")}
                    message={`Really want to ${
                      license.suspended ? "unsuspend" : "suspend"
                    } this license key?`}
                  />
                </RSpace.Item>
                <RSpace.Item>
                  <RPopconfirm
                    anchorElement={
                      <AppButton
                        loading={state.disableLoading}
                        color="danger"
                        type="button"
                      >
                        {license.disabled ? "disabled" : "disable"}
                      </AppButton>
                    }
                    onClickYes={() => onUpdateWithState("disabled")}
                    message={`Really want to ${
                      license.disabled ? "enable" : "disable"
                    } this license key?`}
                  />
                </RSpace.Item>
              </RSpace>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3} md={3}>
                  <AppTextInput
                    labelText="Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      readOnly: !state.editMode,
                      placeholder: "Name for this license key",
                      value: license.name,
                      required: true,
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
                      min: "0",
                      required: true,
                      readOnly: !state.editMode,
                      placeholder: "eg. 1000",
                      value: license.maxEncodeUses,
                      onChange: (e) => {
                        if (e.target.value <= 0)
                          return toast.error(
                            "Only number greater than 0 is allowed"
                          );
                        setLicense({
                          ...license,
                          maxEncodeUses: e.target.value,
                        });
                      },
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
                      required: true,
                      readOnly: !state.editMode,
                      placeholder: "eg. 1000",
                      value: license.maxDecodeUses,
                      onChange: (e) => {
                        if (e.target.value <= 0)
                          return toast.error(
                            "Only number greater than 0 is allowed"
                          );
                        setLicense({
                          ...license,
                          maxDecodeUses: e.target.value,
                        });
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <DatePicker
                    label="Validity"
                    selected={new Date(license.validity)}
                    onChange={(date) =>
                      setLicense({ ...license, validity: date })
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
                    label="disabled"
                    disabled={!state.editMode}
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
                    disabled={!state.editMode}
                    onChange={(e) =>
                      setLicense({ ...license, suspended: e.target.checked })
                    }
                  />
                </Grid>
              </Grid>

              <InputLabel style={{ marginTop: 15 }}>
                Metadata (Key/Value)
              </InputLabel>
              <KeyValue
                data={license.metaData}
                onChangeData={(newData) => {
                  setLicense({ ...license, metaData: newData });
                }}
                disabled={!state.editMode}
                containerStyle={{ marginTop: 5 }}
              />

              <InputLabel style={{ marginTop: 15 }}>
                Owners ({license?.owners?.length})
              </InputLabel>
              <ul style={{ color: "grey" }}>
                {license?.owners?.map((owner, index) => (
                  <li key={index}>{owner.ownerId}</li>
                ))}
              </ul>
            </DataFetchingStateComponent>
          </FancyCard.CardContent>
        </form>
      </FancyCard>
    </div>
  );
}
