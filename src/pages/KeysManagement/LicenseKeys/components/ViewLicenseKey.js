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
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutline";
import {
  Avatar,
  ListItemText,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@material-ui/core";
import { Divider } from "@material-ui/core";
import RDialog from "../../../../components/rcomponents/RDialog";
import RPopover from "../../../../components/rcomponents/RPopover/index";
import { InputAdornment } from "@material-ui/core";
import usersHttps from "../../../../services/https/resources/users.https";

export default function ViewLicenseKey({ closeDialog }) {
  const [state, setState] = useState({
    editMode: false,
    loading: true,
    editLoading: false,
    disableLoading: false,
    suspendLoading: false,
    error: null,
    oldKey: {},
    newUsernameOrId: "",
    removingUserId: "",
    addingNewUserLoading: false,
    removingUserLoading: false,
  });
  let { licenseId } = useParams();
  const location = useLocation();
  const [license, setLicense] = useState({
    name: "",
    key: "",
    maxEncodeUses: "",
    maxDecodeUses: "",
    maxMonitoringUses: "",
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

  const onAddNewUser = (handleClose) => {
    setState({ ...state, addingNewUserLoading: true });
    licensekeysHttps
      .addOwnerToLicense(license.key, state.newUsernameOrId)
      .then(({ data }) => {
        setState({
          ...state,
          newUser: {
            ...state,
            addingNewUserLoading: false,
          },
        });
        setLicense(data);
        toast.success("Added");
        handleClose?.()
      })
      .catch((err) => {
        setState({ ...state, addingNewUserLoading: false });
        toast.error(err.message || "Error adding new owner");
      });
  };

  const onRemoveUser = (usernameOrId) => {
    setState({
      ...state,
      removingUserLoading: true,
      removingUserId: usernameOrId,
    });
    licensekeysHttps
      .removeOwnerFromLicense(license.key, usernameOrId)
      .then(({ data }) => {
        setState({
          ...state,
          newUser: {
            ...state,
            removingUserLoading: false,
          },
        });
        setLicense(data);
        toast.success("Removed");
      })
      .catch((err) => {
        setState({ ...state, removingUserLoading: false });
        toast.error(err.message || "Error removing owner");
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
                <h4 className={headerClasses.cardTitleWhite}>License</h4>
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
                        color="danger"
                        type="button"
                      >
                        {license.suspended ? "suspended" : "suspend"}
                      </AppButton>
                    }
                    onClickYes={() => onUpdateWithState("suspended")}
                    message={`Really want to ${
                      license.suspended ? "unsuspend" : "suspend"
                    } this license?`}
                  />
                </RSpace.Item>
                {/* <RSpace.Item>
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
                    } this license?`}
                  />
                </RSpace.Item> */}
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
                      placeholder: "Name for this license",
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
                    labelText="Max Monitoring Uses"
                    id="max-monitoring-uses"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      min: "0",
                      required: true,
                      readOnly: !state.editMode,
                      placeholder: "eg. 1000",
                      value: license.maxMonitoringUses,
                      onChange: (e) => {
                        if (e.target.value <= 0)
                          return toast.error(
                            "Only number greater than 0 is allowed"
                          );
                        setLicense({
                          ...license,
                          maxMonitoringUses: e.target.value,
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
                {/* <Grid item>
                  <SwitchWithLabel
                    label="disabled"
                    disabled={!state.editMode}
                    checked={license.disabled}
                    onChange={(e) =>
                      setLicense({ ...license, disabled: e.target.checked })
                    }
                  />
                </Grid> */}
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

              <Divider style={{ marginTop: 20, marginBottom: 10 }} />
              <InputLabel style={{ display: "flex", alignItems: "center" }}>
                <div>Owners ({license?.owners?.length})</div>
                <RPopover
                  paperStyle={{ minWidth: 500 }}
                  TransitionProps={{
                    onExit:()=>setState({...state,newUsernameOrId:''})
                  }}
                  anchorElement={
                    <AppButton
                      asIconButton={true}
                      variant="container"
                      color="success"
                      size="small"
                    >
                      {<AddIcon style={{ fontSize: 20 }} />}
                    </AppButton>
                  }
                >
                  {({ handleClose }) => (
                    <div style={{ padding: 15 }}>
                      <AppTextInput
                        labelText="Username or sub"
                        id="usernameforlicense"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        success={state.newUsernameOrId ? true : false}
                        inputProps={{
                          value: state.newUsernameOrId,
                          onChange: (e) => {
                            setState({
                              ...state,
                              newUsernameOrId: e.target.value,
                            });
                          },
                          placeholder: "username or sub",
                        }}
                      />
                      <AppButton
                        color="success"
                        onClick={()=>onAddNewUser(handleClose)}
                        disabled={state.newUsernameOrId ? false : true}
                        loading={state.addingNewUserLoading}
                      >
                        Add
                      </AppButton>
                    </div>
                  )}
                </RPopover>
              </InputLabel>

              <List>
                {license?.owners?.map((owner, index) => (
                  <ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                      <Avatar>{owner.username?.charAt?.(0) || "U"}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={owner.username || owner.ownerId}
                      secondary={owner.email || "--"}
                    />
                    <RPopconfirm
                      anchorElement={
                        <AppButton
                          asIconButton={true}
                          color="danger"
                          size="small"
                          loading={
                            owner.ownerId == state.removingUserId &&
                            state.removingUserLoading
                          }
                        >
                          <DeleteOutlinedIcon style={{ fontSize: 18 }} />
                        </AppButton>
                      }
                      onClickYes={() => onRemoveUser(owner.ownerId)}
                      message="Really want to delete this item?"
                    />
                  </ListItem>
                ))}
              </List>
            </DataFetchingStateComponent>
          </FancyCard.CardContent>
        </form>
      </FancyCard>
    </div>
  );
}
