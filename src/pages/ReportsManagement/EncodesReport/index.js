import { Tooltip } from '@material-ui/core';
import moment from 'moment';
import React from 'react'

import CustomPagination from '../../../components/common/CustomPagination';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import FancyCard from '../../../components/FancyCard/FancyCard';
import Table from '../../../components/Table/Table';
import { useStore } from '../../../stores';
import ReportsDateRange from '../components/ReportsDateRange';
import FilterEncodesReport from './components/FilterEncodesReport';

export default function EncodesReport() {
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
                    return value ? moment(value).utc().format("DD/MM/YYYY") : "---";
                }
            }
        },
        {
            label: "Time",
            name: "createdAt",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value ? moment(value).utc().format("HH:mm") : "---";
                }
            }
        },
        {
            label: "Duration",
            name: "contentDuration",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value ? moment.utc(value * 1000).format("mm:ss") : "---";
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
                <ReportsDateRange
                    startDate={sonickeyStore?.getDateRange?.startDate}
                    onChangeStartDate={(date) => sonickeyStore?.changeDateRange({ ...sonickeyStore?.getDateRange, startDate: date })}
                    endDate={sonickeyStore?.getDateRange?.endDate}
                    onChangeEndDate={(date) => sonickeyStore?.changeDateRange({ ...sonickeyStore?.getDateRange, endDate: date })}
                />

                <FancyCard.CardContent style={{ zIndex: 0 }}>
                    <DataFetchingStateComponent
                        loading={sonickeyStore.loading}
                        error={sonickeyStore.error}
                        onClickTryAgain={() => sonickeyStore.fetchSonicKeys()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    filterOnly
                                    openDialogFilter={true}
                                    refreshButtonProps={{
                                        onClick: () => sonickeyStore.fetchSonicKeys(),
                                    }}
                                    componentInsideDialogFilter={<FilterEncodesReport />}
                                />
                            }
                            data={sonickeyStore?.getSonicKeys?.docs || []}
                            columns={columns}
                            options={{
                                count: sonickeyStore?.getSonicKeys?.totalDocs || 0,
                                customFooter: () => {
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
