import React, { useState } from 'react'
import moment from 'moment';
import { Tooltip } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from 'react-toastify';

import { useStore } from '../../../stores';
import RSpace from '../../../components/rcomponents/RSpace';
import RPopconfirm from '../../../components/rcomponents/RPopconfirm';
import AppButton from '../../../components/AppButton/AppButton';
import FancyCard from '../../../components/FancyCard/FancyCard';
import DatePicker from '../../../components/DatePicker/DatePicker';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import Table from '../../../components/Table/Table';
import CustomPagination from '../../../components/common/CustomPagination';
import DetectionFilter from '../components/DetectionFilter';
import DetectionDateRange from '../components/DetectionDateRange';

export default function TrackPlaysReport() {
    const { reportsdetection } = useStore();
    const [state, setState] = useState({
        deletigPlayId: "",
        isDeletingPlay: false
    });

    React.useEffect(() => {
        reportsdetection.changeDetectionTablePage(1);
        reportsdetection.fetchReportsDetection();
    }, [reportsdetection?.getDateRange?.startDate, reportsdetection?.getDateRange?.endDate]);

    const deletePlay = (playId) => {
        setState({ ...state, deletigPlayId: playId, isDeletingPlay: true })
        reportsdetection.deletePlay(playId)
            .then(data => {
                setState({ ...state, deletigPlayId: '', isDeletingPlay: false })
                toast.success("Deleted")
            })
            .catch(err => {
                setState({ ...state, deletigPlayId: '', isDeletingPlay: false })
                toast.error(err.message || "Error deleting play")
            })
    }

    const columns = [
        {
            label: "SonicKey",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const sonickey = value?.sonicKey || "---";
                    return sonickey;
                },
            },
        },
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
            label: "Date",
            name: "detectedAt",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const date = value ? moment(value).utc().format("DD/MM/YYYY") : "---";
                    return date;
                },
            },
        },
        {
            label: "Time",
            name: "detectedAt",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const time = value ? moment(value).utc().format("HH:mm") : "---";
                    return time;
                },
            },
        },
        {
            label: "Duration",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const duration = value?.contentDuration
                        ? moment.utc(value?.contentDuration * 1000).format("mm:ss")
                        : "---";
                    return duration;
                },
            },
        },
        {
            label: "Original Filename",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const filename =
                        value?.originalFileName?.length > 20
                            ? value?.originalFileName?.slice(0, 20) + "..."
                            : value?.originalFileName || value?.contentFileName?.length > 20
                                ? value?.contentFileName?.slice(0, 20) + "..."
                                : value?.contentFileName;
                    return (
                        <Tooltip title={value?.originalFileName || value?.contentFileName}>
                            <div>{filename}</div>
                        </Tooltip>
                    );
                },
            },
        },
        {
            label: "Artist",
            name: "sonicKey",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const artist =
                        value?.contentOwner === ""
                            ? "---"
                            : value?.contentOwner?.length > 20
                                ? value?.contentOwner?.slice(0, 20) + "..."
                                : value?.contentOwner;
                    return (
                        <Tooltip title={value?.contentOwner}>
                            <div>{artist}</div>
                        </Tooltip>
                    );
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
            label: "Actions",
            name: "_id",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return (
                        <RSpace>
                            <RSpace.Item>
                                <RPopconfirm
                                    anchorElement={
                                        <AppButton loading={(state.deletigPlayId && value == state.deletigPlayId)} asIconButton={true} color="danger" size="small">
                                            <DeleteIcon style={{ fontSize: 18 }} />
                                        </AppButton>
                                    }
                                    message="Really want to delete this play?"
                                    onClickYes={() => deletePlay(value)}
                                />
                            </RSpace.Item>
                        </RSpace>
                    );
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
                                    componentInsideDialogFilter={<DetectionFilter title={"Track Plays"} />}
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
