import React from 'react';
import FancyCard from '../../../components/FancyCard/FancyCard';
import { useStore } from '../../../stores';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import Table from '../../../components/Table/Table';
import CustomPagination from '../../../components/common/CustomPagination';
import DetectionFilter from '../components/DetectionFilter';

export default function ArtistReport() {
    const { reportsdetection } = useStore();

    React.useEffect(() => {
        reportsdetection.changeDetectionTablePage(1);
        reportsdetection.fetchReportsDetection(1, "ARTISTS");
    }, [reportsdetection?.getDateRange?.startDate, reportsdetection?.getDateRange?.endDate]);

    const columns = [
        {
            label: "Artist",
            name: "artist",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "Plays",
            name: "playsCount",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || 0;
                },
            },
        },
        {
            label: "Tracks",
            name: "uniquePlaysCount",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || 0;
                },
            },
        },
        {
            label: "Radio Stations",
            name: "radioStationCount",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || 0;
                },
            },
        },
        {
            label: "Countries",
            name: "countriesCount",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || 0;
                },
            },
        },
        // {
        //     label: "TV Channels",
        //     name: "radioStationCount",
        //     options: {
        //         filter: false,
        //         customBodyRender: (value) => {
        //             return value || 0;
        //         },
        //     },
        // },

    ];

    const onPageChange = (page) => {
        reportsdetection.fetchReportsDetection(page, "ARTISTS");
        reportsdetection?.changeDetectionTablePage(page);
    };

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="purple">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Artists Report</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all artists
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <FancyCard.CardContent style={{ zIndex: 0 }}>
                    <DataFetchingStateComponent
                        loading={reportsdetection.loading}
                        error={reportsdetection.error}
                        onClickTryAgain={() => reportsdetection.fetchReportsDetection(reportsdetection?.getDetectionReports?.page, "ARTISTS")}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    filterOnly
                                    openDialogFilter={true}
                                    refreshButtonProps={{
                                        onClick: () => reportsdetection.fetchReportsDetection(reportsdetection?.getDetectionReports?.page, "ARTISTS"),
                                    }}
                                    componentInsideDialogFilter={<DetectionFilter title={"Artists"} playsBy={"ARTISTS"} />}
                                    dateRange={true}
                                    startDate={reportsdetection?.getDateRange?.startDate}
                                    onChangeStartDate={(date) => reportsdetection?.changeDateRange({ ...reportsdetection?.getDateRange, startDate: date })}
                                    endDate={reportsdetection?.getDateRange?.endDate}
                                    onChangeEndDate={(date) => reportsdetection?.changeDateRange({ ...reportsdetection?.getDateRange, endDate: date })}
                                />
                            }
                            data={reportsdetection?.getDetectionReports?.docs || []}
                            columns={columns}
                            options={{
                                count: reportsdetection?.getDetectionReports?.totalDocs || 0,
                                customFooter: () => {
                                    return (
                                        <CustomPagination
                                            totalPages={reportsdetection?.getDetectionReports?.totalPages}
                                            page={reportsdetection?.getDetectionTablePage}
                                            onChange={(event, value) => onPageChange(value)}
                                        />
                                    );
                                },
                            }}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    );
}
