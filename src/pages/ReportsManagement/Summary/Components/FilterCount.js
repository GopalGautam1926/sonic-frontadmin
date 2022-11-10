import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import React from 'react'
import AppButton from '../../../../components/AppButton/AppButton'
import AppTextInput from '../../../../components/AppTextInput/AppTextInput'
import CountryDropDown from '../../../../components/AppTextInput/CountryDropDown'
import CustomDropDown from '../../../../components/AppTextInput/CustomDropDown'
import RadioDropDown from '../../../../components/AppTextInput/RadioDropDown'
import FancyCard from '../../../../components/FancyCard/FancyCard'
import CompanyPicker from '../../../../components/Picker/CompanyPicker'
import PartnerPicker from '../../../../components/Picker/PartnerPicker'
import { Channel } from '../../../../constants'
import { useStore } from '../../../../stores'

const FilterCount = ({ closeDialog }) => {
    const { summaryCountStore } = useStore();

    const onSummaryReportSubmit = (e) => {
        e.preventDefault();
        summaryCountStore.fetchPartnersCount();
        summaryCountStore.fetchCompanyCount();
        summaryCountStore.fetchEncodesCount();
        summaryCountStore.fetchPlaysCount();
        summaryCountStore.fetchTracksCount();
        closeDialog?.()
    }

    return (
        <FancyCard
            cardHeader={
                <FancyCard.CardHeader color="purple">
                    {(headerClasses) => (
                        <>
                            <h4 className={headerClasses.cardTitleWhite}>
                                Filter
                            </h4>
                            <p className={headerClasses.cardCategoryWhite}>
                                Filter by summary report
                            </p>
                        </>
                    )}
                </FancyCard.CardHeader>
            }
        >
            <form onSubmit={onSummaryReportSubmit}>
                <FancyCard.CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={3}>
                            <PartnerPicker
                                labelText="Partner"
                                placeholder="Search for partner"
                                value={summaryCountStore?.getFilters?.partnerName}
                                getSelectedValue={(partner) => summaryCountStore?.changeFilters({ ...summaryCountStore?.getFilters, partnerName: partner })}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <CompanyPicker
                                labelText="Company"
                                placeholder="Search for company"
                                value={summaryCountStore?.getFilters?.companyName}
                                getSelectedValue={(company) => summaryCountStore?.changeFilters({ ...summaryCountStore?.getFilters, companyName: company })}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppTextInput
                                labelText="Track Title"
                                id="track"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    placeholder: "Track Title",
                                    value: summaryCountStore?.getFilters?.track,
                                    onChange: (e) => summaryCountStore?.changeFilters({ ...summaryCountStore?.getFilters, track: e.target.value })
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppTextInput
                                labelText="Artist"
                                id="artist"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    placeholder: "Artist",
                                    value: summaryCountStore?.getFilters?.artist,
                                    onChange: (e) => summaryCountStore?.changeFilters({ ...summaryCountStore?.getFilters, artist: e.target.value })
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <RadioDropDown
                                labelText="Radio Station"
                                id="radiostation"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    placeholder: "Radio Station",
                                    value: summaryCountStore?.getFilters?.radiostation,
                                    onChange: (e) => summaryCountStore?.changeFilters({ ...summaryCountStore?.getFilters, radiostation: e.target.value })
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <CountryDropDown
                                labelText="Country"
                                id="country"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    placeholder: "Country",
                                    value: summaryCountStore?.getFilters?.country,
                                    onChange: (e) => summaryCountStore?.changeFilters({ ...summaryCountStore?.getFilters, country: e.target.value })
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <CustomDropDown
                                labelText="Channel"
                                id="channel"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    placeholder: "Channel",
                                    value: summaryCountStore?.getFilters?.channel,
                                    onChange: (e) => summaryCountStore?.changeFilters({ ...summaryCountStore?.getFilters, channel: e.target.value })
                                }}
                                data={Channel || []}
                            />
                        </Grid>
                    </Grid>
                </FancyCard.CardContent>

                <FancyCard.CardActions>
                    <AppButton color="danger" onClick={() => closeDialog?.()}>
                        Close
                    </AppButton>
                    <AppButton onClick={() => summaryCountStore?.resetFilter()}>Reset</AppButton>
                    <AppButton color='success' type="submit">Apply</AppButton>
                </FancyCard.CardActions>
            </form>
        </FancyCard>
    )
}

export default observer(FilterCount)