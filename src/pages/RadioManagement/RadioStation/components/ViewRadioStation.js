import { CircularProgress, FormHelperText, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AppButton from "../../../../components/AppButton/AppButton";
import AppTextInput from "../../../../components/AppTextInput/AppTextInput";
import FancyCard from "../../../../components/FancyCard/FancyCard";
import RSpace from "../../../../components/rcomponents/RSpace";
import { useParams, useLocation } from "react-router-dom";
import radiostationHttps from "../../../../services/https/resources/radiostation.https";
import DataFetchingStateComponent from "../../../../components/common/DataFetchingStateComponent";
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { toast } from "react-toastify";
import { Divider } from "@material-ui/core";
import CountryDropDown from "../../../../components/AppTextInput/CountryDropDown";

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
    const [stateData, setStateData] = useState({
        loading: false,
        validateLoading: false,
    });
    const [emailCheck, setEmailCheck] = useState(false);
    let { radioStationId } = useParams();
    const location = useLocation();
    const [radioStation, setRadioStation] = useState({
        _id: "",
        adminEmail: "",
        name: "",
        country: "",
        streamingUrl: "",
        website: "",
    });
    const [onEdit, setOnEdit] = useState(false);
    const [checkInputs, setCheckInputs] = useState();

    useEffect(() => {
        if (checkInputs) {
            setOnEdit(true);
        }
    }, [checkInputs]);

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
        if (emailCheck === true) {
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
        } else {
            setState({ ...state, editLoading: false });
        }
    };


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

                                {!onEdit ? state.editMode && (
                                    <RSpace.Item>
                                        <AppButton
                                            loading={state.editLoading}
                                            loadingText="Updating..."
                                            type="submit"
                                            onClick={() => {
                                                let Emailverification = (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(radioStation.adminEmail));
                                                if (Emailverification === false) {
                                                    toast.error("Not valid Email..");
                                                    setEmailCheck(false)
                                                } else {
                                                    setEmailCheck(true)
                                                }
                                            }}
                                        >
                                            Update
                                        </AppButton>
                                    </RSpace.Item>
                                ) : null}

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


                            </RSpace>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={3} md={3}>
                                    <AppTextInput
                                        labelText="Admin Email"
                                        id="adminEmail"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            readOnly: !state.editMode,
                                            placeholder: "Admin Email",
                                            value: radioStation.adminEmail,
                                            required: true,
                                            onChange: (e) =>
                                                setRadioStation({ ...radioStation, adminEmail: e.target.value }),
                                        }}
                                    />
                                    <FormHelperText style={{ marginTop: '-10px' }}>Please provide a valid admin email in order to get notification upon error.</FormHelperText>
                                </Grid>
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
                                    <CountryDropDown
                                        labelText="Country"
                                        id="country"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            required: true,
                                            placeholder: "Country",
                                            value: radioStation.country,
                                            onChange: (e) =>
                                                setRadioStation({ ...radioStation, country: e.target.value }),
                                        }}
                                    ></CountryDropDown>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} style={{ display: 'flex', alignItems: 'center', marginTop: "10px" }}>
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
                                            onChange: (e) => {
                                                setRadioStation({ ...radioStation, streamingUrl: e.target.value })
                                                setCheckInputs(e.target.value)
                                            },
                                        }}
                                    />
                                    <FormHelperText style={{ marginTop: '-10px' }}>Click on icon to validate the url</FormHelperText>
                                </Grid>
                                {state.editMode && onEdit ? stateData.validateLoading ? <CircularProgress size={20} /> : <VolumeDownIcon style={{ cursor: "pointer" }} onClick={(e) => {
                                    e.preventDefault();
                                    setStateData({ ...stateData, validateLoading: true });
                                    let Emailverification = (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(radioStation.adminEmail));
                                    if (radioStation.name === "" || radioStation.country === "" || radioStation.streamingUrl == "" || radioStation.website === "" || radioStation.adminEmail === "" || Emailverification !== true) {
                                        toast.error("Please fill all the fields and Valid Email");
                                        setStateData({ ...stateData, validateLoading: false });
                                    } else {
                                        setStateData({ ...stateData, validateLoading: true });
                                        const audio = new Audio(radioStation.streamingUrl)
                                        audio?.play().then(() => {
                                            setStateData({ ...stateData, validateLoading: true });
                                            toast.success("Streaming URL working");
                                            setTimeout(() => {
                                                audio.pause();
                                                setState({ ...state, editMode: true });
                                                setStateData({ ...stateData, validateLoading: false });
                                            }, 3000);
                                            setOnEdit(false);
                                        }).catch(() => {
                                            toast.error("Not valid URL");
                                            setStateData({ ...stateData, validateLoading: false });
                                        })
                                    }
                                }} /> : null}
                            </Grid>



                            <Divider style={{ marginTop: 20, marginBottom: 10 }} />


                        </DataFetchingStateComponent>
                    </FancyCard.CardContent>
                </form>
            </FancyCard>
        </div>
    );
}
