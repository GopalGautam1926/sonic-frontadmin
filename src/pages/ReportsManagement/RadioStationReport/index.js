import React from 'react';
import FancyCard from '../../../components/FancyCard/FancyCard';
import { useStore } from '../../../stores';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import Table from '../../../components/Table/Table';
import CustomPagination from '../../../components/common/CustomPagination';
import DetectionFilter from '../components/DetectionFilter';
import DetectionDateRange from '../components/DetectionDateRange';

export default function RadioStationReport() {
    const { reportsdetection } = useStore();

    React.useEffect(() => {
        reportsdetection.changeDetectionTablePage(1);
        reportsdetection.fetchReportsDetection(1, "RADIOSTATIONS");
    }, [reportsdetection?.getDateRange?.startDate, reportsdetection?.getDateRange?.endDate]);

    const columns = [
        {
            label: "Radio Station",
            name: "radioStation",
            options: {
                filter: false,
                customBodyRender: (radioStation) => {
                    const radio = radioStation?.name || "---";
                    return radio;
                },
            },
        },
        {
            label: "Country",
            name: "radioStation",
            options: {
                filter: false,
                customBodyRender: (radioStation) => {
                    const country = radioStation?.country || "---";
                    return country;
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
            label: "Artists",
            name: "artistsCount",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || 0;
                },
            },
        },
    ];

    const onPageChange = (page) => {
        reportsdetection.fetchReportsDetection(page, "RADIOSTATIONS");
        reportsdetection?.changeDetectionTablePage(page);
    };

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="success">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Radio Station Report</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all radio stations
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <DetectionDateRange />

                <FancyCard.CardContent style={{ zIndex: 0 }}>
                    <DataFetchingStateComponent
                        loading={reportsdetection.loading}
                        error={reportsdetection.error}
                        onClickTryAgain={() => reportsdetection.fetchReportsDetection(reportsdetection?.getDetectionReports?.page, "RADIOSTATIONS")}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    filterOnly
                                    openDialogFilter={true}
                                    refreshButtonProps={{
                                        onClick: () => reportsdetection.fetchReportsDetection(reportsdetection?.getDetectionReports?.page, "RADIOSTATIONS"),
                                    }}
                                    componentInsideDialogFilter={<DetectionFilter title={"Radio Station"} playsBy={"RADIOSTATIONS"} />}
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
