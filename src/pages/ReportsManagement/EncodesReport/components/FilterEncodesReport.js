import React from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'

import { useStore } from '../../../../stores';
import FancyCard from '../../../../components/FancyCard/FancyCard';
import AppTextInput from '../../../../components/AppTextInput/AppTextInput';
import CustomDropDown from '../../../../components/AppTextInput/CustomDropDown';
import { Channel, Distributor, Labels } from '../../../../constants';
import PartnerPicker from '../../../../components/Picker/PartnerPicker';
import CompanyPicker from '../../../../components/Picker/CompanyPicker';
import UserPicker from '../../../../components/Picker/UserPicker/UserPicker';
import AppButton from '../../../../components/AppButton/AppButton';
import RadioDropDown from '../../../../components/AppTextInput/RadioDropDown';
import CountryDropDown from '../../../../components/AppTextInput/CountryDropDown';

function FilterEncodesReport({ closeDialog }) {
    const { sonickeyStore } = useStore();

    const onSubmit = (e) => {
        e.preventDefault();
        sonickeyStore.changeSonicKeyTablePage(1)
        sonickeyStore.fetchSonicKeys()
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
                                    Filter by encoded sonickeys
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
                                    value={sonickeyStore?.getFilters?.partnerName}
                                    getSelectedValue={(partner) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, partnerName: partner })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <CompanyPicker
                                    labelText="Company"
                                    placeholder="Search for company"
                                    value={sonickeyStore?.getFilters?.companyName}
                                    getSelectedValue={(company) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, companyName: company })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AppTextInput
                                    labelText="Track"
                                    id="track"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Track",
                                        value: sonickeyStore?.getFilters?.track,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, track: e.target.value })
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
                                        value: sonickeyStore?.getFilters?.artist,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, artist: e.target.value })
                                    }}
                                />
                            </Grid>

                            {/* <Grid item xs={12} sm={6} md={3}>
                                <RadioDropDown
                                    labelText="Radio Station"
                                    id="radiostation"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Radio Station",
                                        value: sonickeyStore?.getFilters?.radiostation,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, radiostation: e.target.value })
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
                                        value: sonickeyStore?.getFilters?.country,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, country: e.target.value })
                                    }}
                                ></CountryDropDown>
                            </Grid> */}

                            <Grid item xs={12} sm={6} md={3}>
                                <CustomDropDown
                                    labelText="Channel"
                                    id="channel"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Channel",
                                        value: sonickeyStore?.getFilters?.channel,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, channel: e.target.value })
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
                        <AppButton onClick={() => sonickeyStore?.resetFilter()}>Reset</AppButton>
                        <AppButton color='success' type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}

export default observer(FilterEncodesReport);
