import React from 'react'
import { Grid } from '@material-ui/core'
import FancyCard from '../../../../components/FancyCard/FancyCard'
import AppTextInput from '../../../../components/AppTextInput/AppTextInput'
import CountryDropDown from '../../../../components/AppTextInput/CountryDropDown'
import AppButton from '../../../../components/AppButton/AppButton'
import { useStore } from '../../../../stores'
import ChannelDropDown from '../../../../components/AppTextInput/ChannelDropDown'
import CompanyDropDown from '../../../CompanyManagement/components/CompanyDropDown'
import GroupDropDown from '../../../GroupManagement/components/GroupDropDown'
import RadioDropDown from '../../../../components/AppTextInput/RadioDropDown'
import { observer } from 'mobx-react'
import DatePicker from '../../../../components/DatePicker/DatePicker'

function FilterPlays({ closeDialog }) {

    const { playsStore } = useStore();

    const onSubmit = (e) => {
        e.preventDefault();
        playsStore.changePlayTablePage(1)
        playsStore.fetchPlays()
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
                                <ChannelDropDown
                                    labelText="Channel"
                                    id="channel"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Channel",
                                        value: playsStore?.getFilters?.channel,
                                        onChange: (e) => playsStore?.changeFilters({ ...playsStore?.getFilters, channel: e.target.value })
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
                                        placeholder: "SonicKey",
                                        value: playsStore?.getFilters?.sonickey,
                                        onChange: (e) => playsStore?.changeFilters({ ...playsStore?.getFilters, sonickey: e.target.value })
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
                                        placeholder: "Country",
                                        value: playsStore?.getFilters?.country,
                                        onChange: (e) => playsStore?.changeFilters({ ...playsStore?.getFilters, country: e.target.value })
                                    }}
                                ></CountryDropDown>
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <RadioDropDown
                                    labelText="Radio Station"
                                    id="radiostation"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Radio Station",
                                        value: playsStore?.getFilters?.radiostation,
                                        onChange: (e) => playsStore?.changeFilters({ ...playsStore?.getFilters, radiostation: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Artist"
                                    id="artist"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Artist",
                                        value: playsStore?.getFilters?.artist,
                                        onChange: (e) => playsStore?.changeFilters({ ...playsStore?.getFilters, artist: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Track"
                                    id="track"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Track",
                                        value: playsStore?.getFilters?.track,
                                        onChange: (e) => playsStore?.changeFilters({ ...playsStore?.getFilters, track: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Label"
                                    id="label"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Label",
                                        value: playsStore?.getFilters?.label,
                                        onChange: (e) => playsStore?.changeFilters({ ...playsStore?.getFilters, label: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Distributor"
                                    id="distributor"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Distributor",
                                        value: playsStore?.getFilters?.distributor,
                                        onChange: (e) => playsStore?.changeFilters({ ...playsStore?.getFilters, distributor: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <GroupDropDown
                                    selectedValue="NONE"
                                    labelText="Associated Group"
                                    fullWidth
                                    onChangeGroup={(value) => {
                                        playsStore?.changeFilters({ ...playsStore?.getFilters, groupName: value })
                                    }}
                                    value={playsStore?.getFilters?.groupName}
                                />
                            </Grid >

                            <Grid item xs={12} sm={3} md={3}>
                                <CompanyDropDown
                                    labelText="Associated Company"
                                    fullWidth
                                    value={playsStore?.getFilters?.companyName}
                                    onChange={(e) => playsStore?.changeFilters({ ...playsStore?.getFilters, companyName: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Username"
                                    id="username"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Username",
                                        value: playsStore?.getFilters?.username,
                                        onChange: (e) => playsStore?.changeFilters({ ...playsStore?.getFilters, username: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <DatePicker
                                    label="Encoded Date"
                                    selected={playsStore?.getFilters?.encodedDate}
                                    onChange={(date) => playsStore?.changeFilters({ ...playsStore?.getFilters, encodedDate: date })}
                                    showYearDropdown
                                    dateFormat="dd/MM/yyyy"
                                    yearDropdownItemNumber={15}
                                    scrollableYearDropdown
                                    showMonthDropdown
                                />
                            </Grid>
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton onClick={() => playsStore?.resetFilter()}>Reset</AppButton>
                        <AppButton color='success' type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}

export default observer(FilterPlays);
