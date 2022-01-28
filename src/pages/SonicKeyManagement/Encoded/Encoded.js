import React from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import FancyCard from '../../../components/FancyCard/FancyCard';
import Table from '../../../components/Table/Table';
import { useStore } from '../../../stores'
import { format } from 'date-fns';
import moment from 'moment';
import CustomPagination from '../../../components/common/CustomPagination';
import FilterEncoded from './components/FilterEncoded';
import DatePicker from '../../../components/DatePicker/DatePicker';

export default function Encoded() {
    const { sonickeyStore } = useStore();

    React.useEffect(() => {
        sonickeyStore.changeSonicKeyTablePage(1);
        sonickeyStore.fetchSonicKeys();
    }, [sonickeyStore?.getDateRange?.startDate, sonickeyStore?.getDateRange?.endDate])

    const columns = [
        {
            label: "SonicKey",
            name: "sonicKey",
            options: {
                filter: false,
            }
        },
        {
            label: "Date",
            name: "createdAt",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const date = format(new Date(value), "dd/MM/yyyy") || "---";
                    return date;
                }
            }
        },
        {
            label: "Time",
            name: "createdAt",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const time = format(new Date(value), "HH:mm") || "---";
                    return time;
                }
            }
        },
        {
            label: "Duration",
            name: "contentDuration",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const duration = moment.utc(value * 1000).format("mm:ss") || "---";
                    return duration;
                }
            }
        },
        {
            label: "Original Filename",
            name: "originalFileName",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const filename = value?.length > 20 ? value?.slice(0, 20) + "..." : value || "---";
                    return <Tooltip title={value}>
                        <div>{filename}</div>
                    </Tooltip>;
                }
            }
        },
        {
            label: "Artist",
            name: "contentOwner",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const artist = value?.length > 20 ? value?.slice(0, 20) + "..." : value || "---";
                    return <Tooltip title={value}>
                        <div>{artist}</div>
                    </Tooltip>;
                }
            }
        },
    ];

    const onPageChange = (page) => {
        sonickeyStore.fetchSonicKeys(page);
        sonickeyStore?.changeSonicKeyTablePage(page);
    }

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="purple">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Encodes</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all encoded sonickeys
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
                            selected={sonickeyStore?.getDateRange?.startDate}
                            onChange={(date) => sonickeyStore?.changeDateRange({ ...sonickeyStore?.getDateRange, startDate: date })}
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            showMonthDropdown
                            startDate={sonickeyStore?.getDateRange?.startDate}
                            endDate={sonickeyStore?.getDateRange?.endDate}
                        />
                    </Grid>
                    <Grid item className="mt-4 mx-3">
                        <p style={{ fontSize: '14px' }}>TO</p>
                    </Grid>

                    <Grid item>
                        <DatePicker
                            label="End Date"
                            selected={sonickeyStore?.getDateRange?.endDate}
                            onChange={(date) => sonickeyStore?.changeDateRange({ ...sonickeyStore?.getDateRange, endDate: date })}
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            showMonthDropdown
                            startDate={sonickeyStore?.getDateRange?.startDate}
                            endDate={sonickeyStore?.getDateRange?.endDate}
                        />
                    </Grid>
                </Grid>

                <FancyCard.CardContent style={{ zIndex: 0 }}>
                    <DataFetchingStateComponent
                        loading={sonickeyStore.loading}
                        error={sonickeyStore.error}
                        onClickTryAgain={() => sonickeyStore.fetchSonicKeys()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    filter
                                    refreshButtonProps={{
                                        onClick: () => sonickeyStore.fetchSonicKeys(),
                                    }}
                                    componentInsideDialog={<FilterEncoded />}
                                />
                            }
                            data={sonickeyStore?.getSonicKeys?.docs || []}
                            columns={columns}
                            options={{
                                count: sonickeyStore?.getSonicKeys?.totalDocs || 0,
                                customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
                                    return (
                                        <CustomPagination
                                            totalPages={sonickeyStore?.getSonicKeys?.totalPages}
                                            page={sonickeyStore?.getSonicKeyTablePage}
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
