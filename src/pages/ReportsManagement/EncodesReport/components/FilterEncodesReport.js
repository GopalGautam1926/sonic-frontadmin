import React from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'

import { useStore } from '../../../../stores';
import FancyCard from '../../../../components/FancyCard/FancyCard';
import AppTextInput from '../../../../components/AppTextInput/AppTextInput';
import CustomDropDown from '../../../../components/AppTextInput/CustomDropDown';
import { Channel } from '../../../../constants';
import PartnerPicker from '../../../../components/Picker/PartnerPicker';
import CompanyPicker from '../../../../components/Picker/CompanyPicker';
import AppButton from '../../../../components/AppButton/AppButton';
import UserPicker from '../../../../components/Picker/UserPicker/UserPicker';

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
                                    Filter by encoded AmazingTag
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
                                <UserPicker
                                    labelText="User"
                                    placeholder="Search for user"
                                    value={sonickeyStore?.getFilters?.userName}
                                    getSelectedValue={(user) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, userName: user })}
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

                            <Grid item xs={12} sm={6} md={3}>
                                <AppTextInput
                                    labelText="AmazingTag"
                                    id="sonickey"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "SonicKey",
                                        value: sonickeyStore?.getFilters?.sonickey,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, sonickey: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AppTextInput
                                    labelText="Track Id"
                                    id="trackId"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Track Id",
                                        value: sonickeyStore?.getFilters?.trackId,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, trackId: e.target.value })
                                    }}
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
