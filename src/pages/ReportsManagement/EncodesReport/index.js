import { Tooltip } from '@material-ui/core';
import moment from 'moment';
import React from 'react'

import CustomPagination from '../../../components/common/CustomPagination';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import FancyCard from '../../../components/FancyCard/FancyCard';
import Table from '../../../components/Table/Table';
import { useStore } from '../../../stores';
import FilterEncodesReport from './components/FilterEncodesReport';

export default function EncodesReport() {
    const { sonickeyStore } = useStore();

    React.useEffect(() => {
        sonickeyStore.changeSonicKeyTablePage(1);
        sonickeyStore.fetchSonicKeys();
    }, [sonickeyStore?.getDateRange?.startDate, sonickeyStore?.getDateRange?.endDate])

    const columns = [
        {
            label: "Track Id",
            name: "track",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?._id || "---";
                },
            },
        },
        {
            label: "SonicKey",
            name: "sonicKey",
            options: {
                filter: false,
            }
        },
        {
            label: "Title",
            name: "contentName",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const filename = value?.length > 20 ? value?.slice(0, 20) + "..." : value || "---";
                    return (
                        <Tooltip title={value || "---"}>
                            <div>{filename}</div>
                        </Tooltip>
                    );
                },
            },
        },
        {
            label: "Version",
            name: "version",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
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
        {
            label: "MusicType",
            name: "contentType",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "ISRC",
            name: "isrcCode",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "ISWC",
            name: "iswcCode",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "TuneCode",
            name: "tuneCode",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "Label",
            name: "label",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "Distributor",
            name: "distributor",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "FileType",
            name: "contentFileType",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "AudioLength",
            name: "contentDuration",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value ? moment.utc(value * 1000).format("HH:mm:ss:SSS") || "---" : "---";
                }
            }
        },
        {
            label: "AudioSize(MB)",
            name: "contentSize",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value ? (value / 1024).toFixed(3) : "---";
                }
            }
        },
        {
            label: "UnderlyingEncodingofFile",
            name: "contentEncoding",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "SamplingFrequency",
            name: "contentSamplingFrequency",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "QualityGrade",
            name: "contentQuality",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "Description",
            name: "contentDescription",
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
            label: "AdditionalMetadata",
            name: "additionalMetadata",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return JSON.stringify(value) || "---";
                },
            },
        },
        {
            label: "EncodedDate",
            name: "createdAt",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value ? moment(value).utc().format("DD/MM/YYYY") : "---";
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
                                <h4 className={headerClasses.cardTitleWhite}>Encodes Report</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all encoded sonickeys
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
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
                                    dateRange={true}
                                    startDate={sonickeyStore?.getDateRange?.startDate}
                                    onChangeStartDate={(date) => sonickeyStore?.changeDateRange({ ...sonickeyStore?.getDateRange, startDate: date })}
                                    endDate={sonickeyStore?.getDateRange?.endDate}
                                    onChangeEndDate={(date) => sonickeyStore?.changeDateRange({ ...sonickeyStore?.getDateRange, endDate: date })}
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
