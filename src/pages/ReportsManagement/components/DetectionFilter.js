import React from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'

import { useStore } from '../../../stores';
import FancyCard from '../../../components/FancyCard/FancyCard';
import CustomDropDown from '../../../components/AppTextInput/CustomDropDown';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import CountryDropDown from '../../../components/AppTextInput/CountryDropDown';
import RadioDropDown from '../../../components/AppTextInput/RadioDropDown';
import { Channel } from '../../../constants';
import PartnerPicker from '../../../components/Picker/PartnerPicker';
import CompanyPicker from '../../../components/Picker/CompanyPicker';
import AppButton from '../../../components/AppButton/AppButton';

function DetectionFilter({ closeDialog, title, playsBy }) {
    const { reportsdetection } = useStore();

    const onSubmit = (e) => {
        e.preventDefault();
        reportsdetection.changeDetectionTablePage(1);
        reportsdetection.fetchReportsDetection(1, playsBy);
        closeDialog();
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
                                    Filter by {title}
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <form onSubmit={onSubmit}>
                    <FancyCard.CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} md={3}>
                                <PartnerPicker
                                    labelText="Partner"
                                    placeholder="Search for partner"
                                    value={reportsdetection?.getFilters?.partnerName}
                                    getSelectedValue={(partner) => reportsdetection?.changeFilters({ ...reportsdetection?.getFilters, partnerName: partner })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <CompanyPicker
                                    labelText="Company"
                                    placeholder="Search for company"
                                    value={reportsdetection?.getFilters?.companyName}
                                    getSelectedValue={(company) => reportsdetection?.changeFilters({ ...reportsdetection?.getFilters, companyName: company })}
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
                                        value: reportsdetection?.getFilters?.track,
                                        onChange: (e) => reportsdetection?.changeFilters({ ...reportsdetection?.getFilters, track: e.target.value })
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
                                        value: reportsdetection?.getFilters?.artist,
                                        onChange: (e) => reportsdetection?.changeFilters({ ...reportsdetection?.getFilters, artist: e.target.value })
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
                                        value: reportsdetection?.getFilters?.radiostation,
                                        onChange: (e) => reportsdetection?.changeFilters({ ...reportsdetection?.getFilters, radiostation: e.target.value })
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
                                        value: reportsdetection?.getFilters?.country,
                                        onChange: (e) => reportsdetection?.changeFilters({ ...reportsdetection?.getFilters, country: e.target.value })
                                    }}
                                ></CountryDropDown>
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
                                        value: reportsdetection?.getFilters?.channel,
                                        onChange: (e) => reportsdetection?.changeFilters({ ...reportsdetection?.getFilters, channel: e.target.value })
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
                        <AppButton onClick={() => reportsdetection?.resetFilter()}>Reset</AppButton>
                        <AppButton color='success' type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}

export default observer(DetectionFilter);
