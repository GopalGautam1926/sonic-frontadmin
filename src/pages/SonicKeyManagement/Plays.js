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
import CustomPagination from '../../components/common/CustomPagination';
import { log } from '../../utils/app.debug';

export default function Plays() {
    const { sonickeyStore } = useStore();

    React.useEffect(() => {
        sonickeyStore.changePlayTablePage(1);
        sonickeyStore.fetchPlays();
    }, [sonickeyStore?.getFilters?.startDate, sonickeyStore?.getFilters?.endDate])

    const columns = [
        {
            label: "SonicKey",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const sonickey = value?.sonicKey || "---";
                    return sonickey;
                }
            }
        },
        {
            label: "Radio Station",
            name: "radioStation",
            options: {
                filter: false,
                customBodyRender: (radioStation) => {
                    const radio = radioStation?.name || "---";
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
                customBodyRender: (radioStation) => {
                    const country = radioStation?.country || "---";
                    return country;
                }
            }
        },
    ];

    const onPageChange = (page) => {
        sonickeyStore.fetchPlays(page);
        sonickeyStore?.changePlayTablePage(page);
    }

    log("Sonickey store filters", sonickeyStore?.getFilters)

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
                            selected={sonickeyStore?.getFilters?.startDate}
                            onChange={(date) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, startDate: date })}
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
                            selected={sonickeyStore?.getFilters?.endDate}
                            onChange={(date) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, endDate: date })}
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
                            options={{
                                count: sonickeyStore?.getPlays?.totalDocs || 0,
                                customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
                                    return (
                                        <CustomPagination
                                            totalPages={sonickeyStore?.getPlays?.totalPages}
                                            page={sonickeyStore?.getPlayTablePage}
                                            onChange={(event, value) => onPageChange(value)}
                                        />
                                    );
                                }
                            }}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    )
}
