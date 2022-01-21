import { Grid, InputAdornment, TextField, Tooltip } from '@material-ui/core';
import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent';
import FancyCard from '../../components/FancyCard/FancyCard';
import Table from '../../components/Table/Table';
import { useStore } from '../../stores'
import FilterPlays from './components/FilterPlays';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarTodayOutlined } from '@material-ui/icons';
import { format } from 'date-fns';
import moment from 'moment';
import CustomFooter from '../../components/Table/CustomFooter';

export default function Plays() {
    const [values, setValues] = React.useState({
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    })
    const { sonickeyStore } = useStore();

    const columns = [
        {
            label: "SonicKey",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const sonickey = value?.sonicKey ? value?.sonicKey : "---";
                    return sonickey;
                }
            }
        },
        {
            label: "Radio Station",
            name: "radioStation",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const radio = value?.radioStation?.name ? value?.radioStation?.name : "---";
                    return radio;
                }
            }
        },
        {
            label: "Date",
            name: "detectedAt",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const date = value ? format(new Date(value), "dd/MM/yyyy") : "---";
                    return date;
                }
            }
        },
        {
            label: "Time",
            name: "detectedAt",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const time = value ? format(new Date(value), "HH:mm") : "---";
                    return time;
                }
            }
        },
        {
            label: "Duration",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const duration = value?.contentDuration ? moment.utc(value?.contentDuration * 1000).format("mm:ss") : "---";
                    return duration;
                }
            }
        },
        {
            label: "Original Filename",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const filename = value?.originalFileName?.length > 20 ? value?.originalFileName?.slice(0, 20) + "..." : value?.originalFileName || value?.contentFileName?.length > 20 ? value?.contentFileName?.slice(0, 20) + "..." : value?.contentFileName;
                    return <Tooltip title={value?.originalFileName || value?.contentFileName}>
                        <div>{filename}</div>
                    </Tooltip>;
                }
            }
        },
        {
            label: "Artist",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const artist = value?.contentOwner === "" ? "---" : (value?.contentOwner?.length > 20 ? value?.contentOwner?.slice(0, 20) + "..." : value?.contentOwner);
                    return <Tooltip title={value?.contentOwner}>
                        <div>{artist}</div>
                    </Tooltip>;
                }
            }
        },
        {
            label: "Country",
            name: "radioStation",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const country = value?.radioStation?.country ? value?.radioStation?.country : "---";
                    return country;
                }
            }
        },
    ];

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
                            onChange={(date) => {
                                setValues({ ...values, startDate: date })
                                sonickeyStore.fetchPlays({ startDate: values?.startDate, endDate: values?.endDate })
                            }}
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
                            onChange={(date) => {
                                setValues({ ...values, endDate: date });
                                sonickeyStore.fetchPlays({ startDate: values?.startDate, endDate: values?.endDate })
                            }}
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
                            data={sonickeyStore?.getPlays?.docs || []}
                            columns={columns}
                            // options={{
                            //     filter: false,
                            //     pagination: true,
                            //     count: sonickeyStore?.getPlays?.totalDocs,
                            //     page: sonickeyStore?.getPlays?.page,
                            //     customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
                            //         return (
                            //             <CustomFooter
                            //                 count={count}
                            //                 page={page}
                            //                 rowsPerPage={rowsPerPage}
                            //                 changeRowsPerPage={changeRowsPerPage}
                            //                 changePage={changePage}
                            //                 textLabels={textLabels}
                            //             />
                            //         );
                            //     },
                            // }}
                            options={{
                                filter: false,
                                pagination: true,
                                count: sonickeyStore?.getPlays?.totalDocs,
                                // page: sonickeyStore?.getPlays?.page,
                                // rowsPerPage: 10,
                                // onChangePage: (event, value) => sonickeyStore?.fetchPlays({ limit: 10, page: value })
                            }}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    )
}
