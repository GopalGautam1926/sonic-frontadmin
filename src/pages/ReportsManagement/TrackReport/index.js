import React from 'react';
import FancyCard from '../../../components/FancyCard/FancyCard';
import { useStore } from '../../../stores';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import Table from '../../../components/Table/Table';
import CustomPagination from '../../../components/common/CustomPagination';
import DetectionFilter from '../components/DetectionFilter';

export default function TrackReport() {
    const { reportsdetection } = useStore();

    React.useEffect(() => {
        reportsdetection.changeDetectionTablePage(1);
        reportsdetection.fetchReportsDetection(1, "TRACKS");
    }, [// eslint-disable-line react-hooks/exhaustive-deps
        reportsdetection?.getDateRange?.startDate, reportsdetection?.getDateRange?.endDate]);

    const columns = [
        {
            label: "TITLE",
            name: "trackName",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "PLAYS",
            name: "playsCount",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || 0;
                },
            },
        },
        {
            label: "TRACKS",
            name: "uniquePlaysCount",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || 0;
                },
            },
        },
        {
            label: "ARTISTS",
            name: "artistsCount",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || 0;
                },
            },
        },
        {
            label: "RADIO STATIONS",
            name: "radioStationCount",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || 0;
                },
            },
        },
        {
            label: "COUNTRIES",
            name: "countriesCount",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || 0;
                },
            },
        },
    ];

    const onPageChange = (page) => {
        reportsdetection.fetchReportsDetection(page, "TRACKS");
        reportsdetection?.changeDetectionTablePage(page);
    };

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="success">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Tracks Report</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all tracks
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
                        onClickTryAgain={() => reportsdetection.fetchReportsDetection(reportsdetection?.getDetectionReports?.page, "TRACKS")}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    exportData={true}
                                    handleExport={(data) => reportsdetection.exportReportsDetectionData(data, "TRACKS")}
                                    filterOnly
                                    openDialogFilter={true}
                                    refreshButtonProps={{
                                        onClick: () => reportsdetection.fetchReportsDetection(reportsdetection?.getDetectionReports?.page, "TRACKS"),
                                    }}
                                    componentInsideDialogFilter={<DetectionFilter title={"Tracks"} playsBy={"TRACKS"} />}
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
