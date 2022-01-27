import React from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import FancyCard from '../../../components/FancyCard/FancyCard';
import Table from '../../../components/Table/Table';
import { useStore } from '../../../stores'
import FilterPlays from './components/FilterPlays';
import { format } from 'date-fns';
import moment from 'moment';
import CustomPagination from '../../../components/common/CustomPagination';
import DatePicker from '../../../components/DatePicker/DatePicker';

export default function Plays() {
    const { playsStore } = useStore();

    React.useEffect(() => {
        playsStore.changePlayTablePage(1);
        playsStore.fetchPlays();
    }, [playsStore?.getDateRange?.startDate, playsStore?.getDateRange?.endDate])

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
        playsStore.fetchPlays(page);
        playsStore?.changePlayTablePage(page);
    }

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
                            label="Start Date"
                            selected={playsStore?.getDateRange?.startDate}
                            onChange={(date) => playsStore?.changeDateRange({ ...playsStore?.getDateRange, startDate: date })}
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            showMonthDropdown
                            startDate={playsStore?.getDateRange?.startDate}
                            endDate={playsStore?.getDateRange?.endDate}
                        />
                    </Grid>
                    <Grid item className="mt-4 mx-3">
                        <p style={{ fontSize: '14px' }}>TO</p>
                    </Grid>

                    <Grid item>
                        <DatePicker
                            label="End Date"
                            selected={playsStore?.getDateRange?.endDate}
                            onChange={(date) => playsStore?.changeDateRange({ ...playsStore?.getDateRange, endDate: date })}
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            showMonthDropdown
                            startDate={playsStore?.getDateRange?.startDate}
                            endDate={playsStore?.getDateRange?.endDate}
                        />
                    </Grid>
                </Grid>

                <FancyCard.CardContent style={{ zIndex: 0 }}>
                    <DataFetchingStateComponent
                        loading={playsStore.loading}
                        error={playsStore.error}
                        onClickTryAgain={() => playsStore.fetchPlays()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    filter
                                    refreshButtonProps={{
                                        onClick: () => playsStore.fetchPlays(),
                                    }}
                                    componentInsideDialog={<FilterPlays />}
                                />
                            }
                            data={playsStore?.getPlays?.docs || []}
                            columns={columns}
                            options={{
                                count: playsStore?.getPlays?.totalDocs || 0,
                                customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
                                    return (
                                        <CustomPagination
                                            totalPages={playsStore?.getPlays?.totalPages}
                                            page={playsStore?.getPlayTablePage}
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
