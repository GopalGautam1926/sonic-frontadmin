import React from 'react'
import moment from 'moment';
import { Tooltip } from '@material-ui/core';

import { useStore } from '../../../stores';
import FancyCard from '../../../components/FancyCard/FancyCard';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import Table from '../../../components/Table/Table';
import CustomPagination from '../../../components/common/CustomPagination';
import DetectionFilter from '../components/DetectionFilter';
import { getSKSIDFromDetectionOrigin } from '../../../utils/general.utils';

export default function TrackPlaysReport() {
    const { reportsdetection } = useStore();

    React.useEffect(() => {
        reportsdetection.changeDetectionTablePage(1);
        reportsdetection.fetchReportsDetection();
    }, [reportsdetection?.getDateRange?.startDate, reportsdetection?.getDateRange?.endDate]);

    const columns = [
        {
            label: "Company",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.company?.name || "---";
                },
            },
        },
        {
            label: "CompanyType",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.company?.companyType || "---";
                },
            },
        },
        {
            label: "Artist",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const artist = value?.contentOwner?.length > 20 ? value?.contentOwner?.slice(0, 20) + "..." : value?.contentOwner || "---";
                    return (
                        <Tooltip title={value?.contentOwner}>
                            <div>{artist}</div>
                        </Tooltip>
                    );
                },
            },
        },
        {
            label: "Title",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const filename = value?.contentName?.length > 20 ? value?.contentName?.slice(0, 20) + "..." : value?.contentName || "---";
                    return (
                        <Tooltip title={value?.contentName || "---"}>
                            <div>{filename}</div>
                        </Tooltip>
                    );
                },
            },
        },
        {
            label: "RadioStation",
            name: "radioStation",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.name || "---";
                },
            },
        },
        {
            label: "Date",
            name: "detectedAt",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value ? moment(value).utc().format("DD/MM/YYYY") : "---";
                },
            },
        },
        {
            label: "Time",
            name: "detectedAt",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value ? moment(value).utc().format("HH:mm") : "---";
                },
            },
        },
        {
            label: "Duration",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.contentDuration ? moment.utc(value?.contentDuration * 1000).format("mm:ss") : "---";
                },
            },
        },
        {
            label: "Country",
            name: "radioStation",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.country || "---";
                },
            },
        },
        {
            label: "Track Id",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.track?._id || "---";
                },
            },
        },
        {
            label: "SonicKey",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.sonicKey || "---";
                },
            },
        },
        {
            label: "SK/SID",
            name: "detectionOrigins",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return getSKSIDFromDetectionOrigin(value);
                },
            },
        },
        {
            label: "Version",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.version || "---";
                },
            },
        },
        {
            label: "Distributor",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.distributor || "---";
                },
            },
        },
        {
            label: "Label",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.label || "---";
                },
            },
        },
        {
            label: "ISRC",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.isrcCode || "---";
                },
            },
        },
        {
            label: "ISWC",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.iswcCode || "---";
                },
            },
        },
        {
            label: "TuneCode",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.tuneCode || "---";
                },
            },
        },
        {
            label: "Description",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.contentDescription || "---";
                },
            },
        },
        {
            label: "FileType",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.contentFileType || "---";
                },
            },
        },
    ];

    const onPageChange = (page) => {
        reportsdetection?.fetchReportsDetection(page);
        reportsdetection?.changeDetectionTablePage(page);
    };

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="success">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Track Plays Report</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all plays
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
                                    componentInsideDialogFilter={<DetectionFilter title={"Track Plays"} />}
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
