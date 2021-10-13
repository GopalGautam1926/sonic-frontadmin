import { CircularProgress, FormHelperText, Grid, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import AppButton from "../../../../components/AppButton/AppButton";
import AppTextInput from "../../../../components/AppTextInput/AppTextInput";
import FancyCard from "../../../../components/FancyCard/FancyCard";
import { SwitchWithLabel } from "../../../../components/Switch/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import DatePicker from "../../../../components/DatePicker/DatePicker";
import KeyValue from "../../../../components/KeyValue/KeyValue";
import { log } from "../../../../utils/app.debug";
import RadioStationsHttps from "../../../../services/https/resources/radiostation.https";
import { toast } from "react-toastify";
import { useStore } from "../../../../stores";
import countries from "../../../../constants/countries";
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import CountryDropDown from "../../../../components/AppTextInput/CountryDropDown";


const initialRadioStation = {
    name: "",
    country: "",
    streamingUrl: "",
    website: "",
    adminEmail: "",
};
export default function AddRadioStation({ closeDialog }) {
    const [radio, setRadioStation] = useState(initialRadioStation);
    const [createButton, setCreateButton] = useState(false);
    const { radioStationStore } = useStore();
    const [state, setState] = useState({
        loading: false,
        validateLoading: false,
    });

    const [checkInputs, setCheckInputs] = useState();

    React.useEffect(() => {
        if (radio === checkInputs) {
            setCreateButton(true);
        } else {
            setCreateButton(false);
        }
    }, [radio])

    const onSubmit = (e) => {
        e.preventDefault();
        setState({ ...state, loading: true });
        RadioStationsHttps
            .createNewRadioStation(radio)
            .then(({ data }) => {
                setState({ ...state, loading: false });
                setRadioStation(initialRadioStation)
                toast.success("Created successfully");
                closeDialog?.()

            })
            .catch((err) => {
                setState({ ...state, loading: false });
                toast.error(err.message || "Error while creating..");
            });
    };

    const createNewStation = document.getElementById('create');

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="purple">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>
                                    Create New Radio Station
                                </h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    Add new Radio Station
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
                                    labelText="Admin Email"
                                    id="adminEmail"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        required: true,
                                        placeholder: "adminEmail",
                                        value: radio.adminEmail,
                                        onChange: (e) =>
                                            setRadioStation({ ...radio, adminEmail: e.target.value }),
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
                                        required: true,
                                        placeholder: "Name",
                                        value: radio.name,
                                        onChange: (e) =>
                                            setRadioStation({ ...radio, name: e.target.value }),
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
                                        value: radio.country,
                                        onChange: (e) =>
                                            setRadioStation({ ...radio, country: e.target.value }),
                                    }}
                                ></CountryDropDown>

                            </Grid>

                            

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Website"
                                    id="website"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        required: true,
                                        placeholder: "Website",
                                        value: radio.website,
                                        onChange: (e) =>
                                            setRadioStation({ ...radio, website: e.target.value }),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Streaming URL"
                                    id="streaming-url"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        required: true,
                                        placeholder: "Streaming URL",
                                        value: radio.streamingUrl,
                                        onChange: (e) =>
                                            setRadioStation({ ...radio, streamingUrl: e.target.value }),
                                    }}
                                />
                                <FormHelperText style={{ marginTop: '-10px' }}>Click on icon to validate the url</FormHelperText>
                                
                            </Grid>
                            {state.validateLoading ? <CircularProgress size={20} /> : <VolumeDownIcon style={{cursor:"pointer"}} onClick={(e) => {
                                    e.preventDefault();
                                    setState({ ...state, validateLoading: true });
                                    let Emailverification = (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(radio.adminEmail));
                                    if (radio.name === "" || radio.country === "" || radio.streamingUrl == "" || radio.website === "" || radio.adminEmail === "" || Emailverification !== true) {
                                        toast.error("Please fill all the fields and Valid Email");
                                        setState({ ...state, validateLoading: false });
                                    } else {
                                        setState({ ...state, validateLoading: true });
                                        const audio = new Audio(radio.streamingUrl)
                                        audio?.play().then(() => {
                                            setState({ ...state, validateLoading: true });
                                            toast.success("Streaming URL working");
                                            setCheckInputs({ ...radio });
                                            setTimeout(() => {
                                                audio.pause();
                                                setState({ ...state, validateLoading: false });
                                            }, 5000);
                                            setCreateButton(true);
                                        }).catch(() => {
                                            toast.error("Not valid URL");
                                            setState({ ...state, validateLoading: false });
                                        })
                                    }

                                }}/>}
                        </Grid>
                        
                    </FancyCard.CardContent>
{/* 
                    <FancyCard.CardActions>
                        <AppButton loadingText="Validating.." loading={state.validateLoading}>Validate</AppButton>
                    </FancyCard.CardActions> */}

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        {createButton && <AppButton id="create" type="submit" loadingText="Creating.." loading={state.loading}>Create</AppButton>}
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    );
}
