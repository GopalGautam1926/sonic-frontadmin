import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react'
import AppButton from '../../../../components/AppButton/AppButton';
import CountryDropDown from '../../../../components/AppTextInput/CountryDropDown';
import CustomDropDown from '../../../../components/AppTextInput/CustomDropDown';
import FancyCard from '../../../../components/FancyCard/FancyCard'
import { useStore } from '../../../../stores';
import { log } from '../../../../utils/app.debug';

const FilterRadioStaion = ({ closeDialog }) => {
    const { radioStationStore } = useStore();

    log("Radio Station Filters", radioStationStore?.getFilters)

    const onSubmit = (e) => {
        e.preventDefault();
        radioStationStore?.fetchRadioStations()
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
                                    Filter by radio stations
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <form onSubmit={onSubmit}>
                    <FancyCard.CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs>
                                <CountryDropDown
                                    labelText="Country"
                                    id="country"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Country",
                                        value: radioStationStore?.filters?.country,
                                        onChange: (e) =>
                                            radioStationStore?.changeFilters({ ...radioStationStore?.filters, country: e.target.value })
                                    }}
                                />
                            </Grid>
                            <Grid item xs>
                                <CustomDropDown
                                    labelText="Shortlisted"
                                    id="shortlisted"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Shortlisted",
                                        value: radioStationStore?.filters?.shortListed,
                                        onChange: (e) =>
                                            radioStationStore?.changeFilters({ ...radioStationStore?.filters, shortListed: e.target.value })
                                    }}
                                    data={["true", "false"]}
                                />
                            </Grid>
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton onClick={() => radioStationStore?.resetFilter()}> Reset</AppButton>
                        <AppButton color='success' type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div >
    )
}


export default observer(FilterRadioStaion)