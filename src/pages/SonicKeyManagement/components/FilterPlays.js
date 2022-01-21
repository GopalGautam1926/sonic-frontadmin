import React from 'react'
import { Grid, InputAdornment, TextField } from '@material-ui/core'
import FancyCard from '../../../components/FancyCard/FancyCard'
import AppTextInput from '../../../components/AppTextInput/AppTextInput'
import CountryDropDown from '../../../components/AppTextInput/CountryDropDown'
import AppButton from '../../../components/AppButton/AppButton'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarTodayOutlined } from '@material-ui/icons'
import { useStore } from '../../../stores'
import ChannelDropDown from '../../../components/AppTextInput/ChannelDropDown'
import CompanyDropDown from '../../CompanyManagement/components/CompanyDropDown'
import GroupDropDown from '../../GroupManagement/components/GroupDropDown'
import RadioDropDown from '../../../components/AppTextInput/RadioDropDown'
import { observer } from 'mobx-react'

function FilterPlays({ closeDialog }) {

    const { sonickeyStore } = useStore();

    const onSubmit = (e) => {
        e.preventDefault();
        sonickeyStore.changePlayTablePage(1)
        sonickeyStore.fetchPlays()
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
                                        value: sonickeyStore?.getFilters?.channel,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, channel: e.target.value })
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
                                        value: sonickeyStore?.getFilters?.sonickey,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, sonickey: e.target.value })
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
                                        value: sonickeyStore?.getFilters?.country,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, country: e.target.value })
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
                                        value: sonickeyStore?.getFilters?.radiostation,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, radiostation: e.target.value })
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
                                        value: sonickeyStore?.getFilters?.artist,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, artist: e.target.value })
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
                                        value: sonickeyStore?.getFilters?.track,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, track: e.target.value })
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
                                        value: sonickeyStore?.getFilters?.label,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, label: e.target.value })
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
                                        value: sonickeyStore?.getFilters?.distributor,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, distributor: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <GroupDropDown
                                    selectedValue="NONE"
                                    labelText="Associated Groups"
                                    fullWidth
                                    onChangeGroup={(value) => {
                                        sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, groupName: value })
                                    }}
                                    value={sonickeyStore?.getFilters?.groupName}
                                />
                            </Grid >

                            <Grid item xs={12} sm={3} md={3}>
                                <CompanyDropDown
                                    labelText="Associated Companies"
                                    fullWidth
                                    value={sonickeyStore?.getFilters?.companyName}
                                    onChange={(e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, companyName: e.target.value })}
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
                                        value: sonickeyStore?.getFilters?.username,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, username: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <DatePicker
                                    selected={sonickeyStore?.getFilters?.encodedDate}
                                    onChange={(date) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, encodedDate: date })}
                                    customInput={<TextField
                                        id="date"
                                        label="Encoded Date"
                                        style={{
                                            color: "#757575",
                                            backgroundColor: "transparent",
                                            outline: "none",
                                            border: "none",
                                            boxShadow: "none",
                                            width: '100%',
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                fontSize: 14
                                            }
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <CalendarTodayOutlined />
                                                </InputAdornment>
                                            ),
                                            style: {
                                                paddingLeft: 10,
                                                color: '#757575',
                                            },
                                        }}
                                    />}
                                    dateFormat="MMM d,yyyy"
                                    title="Encoded Date"
                                    showYearDropdown
                                    showMonthDropdown
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

export default observer(FilterPlays);
