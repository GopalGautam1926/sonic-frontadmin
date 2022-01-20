import React from 'react'
import { Grid, InputAdornment, TextField } from '@material-ui/core'
import FancyCard from '../../../components/FancyCard/FancyCard'
import AppTextInput from '../../../components/AppTextInput/AppTextInput'
import CountryDropDown from '../../../components/AppTextInput/CountryDropDown'
import AppButton from '../../../components/AppButton/AppButton'
import MenuDropDown from '../../../components/AppTextInput/MenuDropDown'
import { channel } from '../../../constants/DropDownItem'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarTodayOutlined } from '@material-ui/icons'

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
        companyName: "",
        groupName: "",
        username: "",
        encodedDate: "",
    })

    const onSubmit = (e) => {
        e.preventDefault();
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
                                <MenuDropDown
                                    labelText="Channel"
                                    id="channel"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Channel",
                                        value: values.channel,
                                        onChange: (e) =>
                                            setValues({ ...values, channel: e.target.value }),
                                    }}
                                    data={channel}
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
                                        placeholder: "Country",
                                        value: values.country,
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
                                        placeholder: "Radio Station",
                                        value: values.radiostation,
                                        onChange: (e) =>
                                            setValues({ ...values, radiostation: e.target.value }),
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
                                        value: values.artist,
                                        onChange: (e) =>
                                            setValues({ ...values, artist: e.target.value }),
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
                                        value: values.track,
                                        onChange: (e) =>
                                            setValues({ ...values, track: e.target.value }),
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
                                        value: values.label,
                                        onChange: (e) =>
                                            setValues({ ...values, label: e.target.value }),
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
                                        value: values.distributor,
                                        onChange: (e) =>
                                            setValues({ ...values, distributor: e.target.value }),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Company Name"
                                    id="companyName"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Company Name",
                                        value: values.companyName,
                                        onChange: (e) =>
                                            setValues({ ...values, companyName: e.target.value }),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Group Name"
                                    id="groupName"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Group Name",
                                        value: values.groupName,
                                        onChange: (e) =>
                                            setValues({ ...values, groupName: e.target.value }),
                                    }}
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
                                        value: values.username,
                                        onChange: (e) =>
                                            setValues({ ...values, username: e.target.value }),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                <DatePicker
                                    selected={values.endDate}
                                    onChange={(date) => setValues({ ...values, endDate: date })}
                                    customInput={<TextField
                                        id="date"
                                        label="End Date"
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
                                    title="End Date"
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
                        <AppButton type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}
