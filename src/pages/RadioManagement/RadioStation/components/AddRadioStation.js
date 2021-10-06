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
import RadioStationsHttps from "../../../../services/https/resources/radiostation.https";
import { toast } from "react-toastify";
import { useStore } from "../../../../stores";

const initialRadioStation = {
    name: "",
    country: "",
    streamingUrl: "",
    website: "",
};
export default function AddRadioStation({ closeDialog }) {
    const [radio, setRadioStation] = useState(initialRadioStation);
    const { radioStationStore } = useStore();
    const [state, setState] = useState({
        loading: false,
    });

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
                                <AppTextInput
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
                            </Grid>

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
