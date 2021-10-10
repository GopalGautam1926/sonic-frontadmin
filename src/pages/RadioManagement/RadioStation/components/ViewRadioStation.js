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
import radiostationHttps from "../../../../services/https/resources/radiostation.https";
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

export default function ViewRadioStation({ closeDialog }) {
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
    let { radioStationId } = useParams();
    const location = useLocation();
    console.log("radioStationId", radioStationId);
    console.log("location", location);
    const [radioStation, setRadioStation] = useState({
        _id:"",
        name: "",
        country: "",
        streamingUrl: "",
        website: "",
    });

    const getAndSetRadioStation = async () => {
        try {
            setState({ ...state, loading: true, error: null });
            if (location?.state?.radioStation) {
                setRadioStation(location.state.radioStation);
                setState({ ...state, loading: false, oldKey: location.state.radioStation });
            } else {
                const { data } = await radiostationHttps.findByKey(radioStationId);
                setRadioStation(data);
                setState({ ...state, loading: false, oldKey: data });
            }
        } catch (error) {
            setState({ ...state, loading: false, error: error });
        }
    };

    useEffect(() => {
        getAndSetRadioStation();
    }, [radioStationId]);

    const onUpdateSubmit = (e) => {
        e.preventDefault();
        setState({ ...state, editLoading: true });
        radiostationHttps
            .updateRadioStation(radioStation._id, radioStation)
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

    //   const onAddNewUser = (handleClose) => {
    //     setState({ ...state, addingNewUserLoading: true });
    //     licensekeysHttps
    //       .addOwnerToLicense(license.key, state.newUsernameOrId)
    //       .then(({ data }) => {
    //         setState({
    //           ...state,
    //           newUser: {
    //             ...state,
    //             addingNewUserLoading: false,
    //           },
    //         });
    //         setLicense(data);
    //         toast.success("Added");
    //         handleClose?.();
    //       })
    //       .catch((err) => {
    //         setState({ ...state, addingNewUserLoading: false });
    //         toast.error(err.message || "Error adding new owner");
    //       });
    //   };

    //   const onRemoveUser = (usernameOrId) => {
    //     setState({
    //       ...state,
    //       removingUserLoading: true,
    //       removingUserId: usernameOrId,
    //     });
    //     licensekeysHttps
    //       .removeOwnerFromLicense(license.key, usernameOrId)
    //       .then(({ data }) => {
    //         setState({
    //           ...state,
    //           newUser: {
    //             ...state,
    //             removingUserLoading: false,
    //           },
    //         });
    //         setLicense(data);
    //         toast.success("Removed");
    //       })
    //       .catch((err) => {
    //         setState({ ...state, removingUserLoading: false });
    //         toast.error(err.message || "Error removing owner");
    //       });
    //   };

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="purple">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Radio Station</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    {radioStationId || "--"}
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
                            onClickTryAgain={() => getAndSetRadioStation()}
                        >
                            <RSpace justifyContent="flex-end">
                                {state.editMode && (
                                    <RSpace.Item>
                                        <AppButton
                                            onClick={() => {
                                                setState({ ...state, editMode: false });
                                                setRadioStation(state.oldKey);
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

                                {/* <RSpace.Item>
                                    <RPopconfirm
                                        anchorElement={
                                            <AppButton
                                                loading={state.suspendLoading}
                                                color="danger"
                                                type="button"
                                            >
                                                {radioStation.suspended ? "suspended" : "suspend"}
                                            </AppButton>
                                        }
                                        onClickYes={() => onUpdateWithState("suspended")}
                                        message={`Really want to ${license.suspended ? "unsuspend" : "suspend"
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
                                            placeholder: "Name for this Radio Station",
                                            value: radioStation.name,
                                            required: true,
                                            onChange: (e) =>
                                            setRadioStation({ ...radioStation, name: e.target.value }),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3} md={3}>
                                    <AppTextInput
                                        labelText="Streaming Url"
                                        id="streamingUrl"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            readOnly: !state.editMode,
                                            placeholder: "Streaming URL",
                                            value: radioStation.streamingUrl,
                                            required: true,
                                            onChange: (e) =>
                                            setRadioStation({ ...radioStation, streamingUrl: e.target.value }),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3} md={3}>
                                    <AppTextInput
                                        labelText="Website"
                                        id="website"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            readOnly: !state.editMode,
                                            placeholder: "Website",
                                            value: radioStation.website,
                                            required: true,
                                            onChange: (e) =>
                                            setRadioStation({ ...radioStation, website: e.target.value }),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3} md={3}>
                                    <AppTextInput
                                        labelText="Country"
                                        id="country"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            readOnly: !state.editMode,
                                            placeholder: "Country Name",
                                            value: radioStation.country,
                                            required: true,
                                            onChange: (e) =>
                                            setRadioStation({ ...radioStation, country: e.target.value }),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            

                        

                            <Divider style={{ marginTop: 20, marginBottom: 10 }} />
                            
                            
                        </DataFetchingStateComponent>
                    </FancyCard.CardContent>
                </form>
            </FancyCard>
        </div>
    );
}
