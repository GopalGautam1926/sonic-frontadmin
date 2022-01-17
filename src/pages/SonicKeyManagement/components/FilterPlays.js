import React from 'react'
import { Grid } from '@material-ui/core'
import FancyCard from '../../../components/FancyCard/FancyCard'
import AppTextInput from '../../../components/AppTextInput/AppTextInput'
import CountryDropDown from '../../../components/AppTextInput/CountryDropDown'
import AppButton from '../../../components/AppButton/AppButton'

export default function FilterPlays({ closeDialog }) {
    const [values, setValues] = React.useState({
        channel: "",
        sonickey: "",
        country: "",
        radiostation: "",
        artist: "",
        track: "",
        label: "",
        distributor: "",
        encodedDate: "",
    })

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="purple">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>
                                    Filter
                                </h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    Filter by plays
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
                                    labelText="Channel"
                                    id="channel"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        required: true,
                                        placeholder: "Channel",
                                        value: values.channel,
                                        onChange: (e) =>
                                            setValues({ ...values, channel: e.target.value }),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="SonicKey"
                                    id="sonickey"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        required: true,
                                        placeholder: "SonicKey",
                                        value: values.sonickey,
                                        onChange: (e) =>
                                            setValues({ ...values, sonickey: e.target.value }),
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
                                        value: values.channel,
                                        onChange: (e) =>
                                            setValues({ ...values, country: e.target.value }),
                                    }}
                                ></CountryDropDown>
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Radio Station"
                                    id="radiostation"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        required: true,
                                        placeholder: "Radio Station",
                                        value: values.radiostation,
                                        onChange: (e) =>
                                            setValues({ ...values, radiostation: e.target.value }),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        {/* {createButton && <AppButton id="create" type="submit" loadingText="Creating.." loading={state.loading}>Create</AppButton>} */}
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}
