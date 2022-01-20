import { Grid, InputAdornment, TextField } from '@material-ui/core';
import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent';
import FancyCard from '../../components/FancyCard/FancyCard';
import Table from '../../components/Table/Table';
import { useStore } from '../../stores'
import FilterPlays from './components/FilterPlays';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarTodayOutlined } from '@material-ui/icons';

export default function Plays() {
    const [values, setValues] = React.useState({
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    })
    const { sonickeyStore } = useStore();

    const columns = [
        {
            label: "SonicKey",
            name: "sonickey",
        },
        {
            label: "Radio Station",
            name: "radiostation",
        },
        {
            label: "Date",
            name: "date",
        },
        {
            label: "Time",
            name: "time",
        },
        {
            label: "Duration",
            name: "duration",
        },
        {
            label: "Original Filename",
            name: "name",
        },
        {
            label: "Artist",
            name: "artist",
        },
        {
            label: "Country",
            name: "country",
        }
    ];

    const data = [
        ["sgMMPCeNWxa", "ArBa", "17/01/2022", "05:53", "05:00", "PUTHAM PUTHU _ DALAPATHI.mp3", "ILAYARAJA", "UK"],
        ["sgMMPCeNWxa", "ArBa", "17/01/2022", "04:53", "05:00", "PUTHAM PUTHU _ DALAPATHI.mp3", "ILAYARAJA", "UK"]
    ]

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="success">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Plays</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all plays
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <Grid container style={{ padding: "0px 20px", display: 'flex', justifyContent: 'flex-end', zIndex: 1 }}>
                    <Grid item>
                        <DatePicker
                            selected={values.startDate}
                            onChange={(date) => setValues({ ...values, startDate: date })}
                            customInput={<TextField
                                id="date"
                                label="Start Date"
                                style={{
                                    color: "#757575",
                                    backgroundColor: "transparent",
                                    outline: "none",
                                    border: "none",
                                    boxShadow: "none",
                                    margin: "5px 30px 0px 20px",
                                    width: 220,
                                }}
                                InputLabelProps={{
                                    style: {
                                        marginLeft: 8,
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
                            title="Start Date"
                            showYearDropdown
                            showMonthDropdown
                        />
                    </Grid>
                    <Grid item className="mt-4 mx-3">
                        <p style={{ fontSize: '14px' }}>TO</p>
                    </Grid>
                    <Grid item>
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
                                    margin: "5px 30px 0px 20px",
                                    width: 220,
                                }}
                                InputLabelProps={{
                                    style: {
                                        marginLeft: 8,
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

                <FancyCard.CardContent style={{ zIndex: 0 }}>
                    <DataFetchingStateComponent
                        loading={sonickeyStore.loading}
                        error={sonickeyStore.error}
                        onClickTryAgain={() => sonickeyStore.fetchPlays()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    filter
                                    refreshButtonProps={{
                                        onClick: () => sonickeyStore.fetchPlays(),
                                    }}
                                    componentInsideDialog={<FilterPlays />}
                                />
                            }
                            data={data}
                            columns={columns}
                            options={{
                                count: sonickeyStore?.getPlays?.totalDocs
                            }}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    )
}
