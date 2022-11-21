import React from 'react'
import { Tooltip } from '@material-ui/core';
import moment from 'moment';

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
    }, [// eslint-disable-line react-hooks/exhaustive-deps
        sonickeyStore?.getDateRange?.startDate, sonickeyStore?.getDateRange?.endDate])

    const stableTableData = () => {
        const data = sonickeyStore?.getSonicKeys?.docs?.map((data) => {
            return ({
                trackId: data?.track?._id,
                sonicKey: data?.sonicKey,
                contentName: data?.contentName,
                version: data?.version,
                contentOwner: data?.contentOwner,
                contentType: data?.contentType,
                isrcCode: data?.isrcCode,
                iswcCode: data?.iswcCode,
                tuneCode: data?.tuneCode,
                label: data?.label,
                distributor: data?.distributor,
                contentFileType: data?.contentFileType,
                contentDuration: data?.contentDuration,
                contentSize: data?.contentSize,
                contentEncoding: data?.contentEncoding,
                contentSamplingFrequency: data?.contentSamplingFrequency,
                contentQuality: data?.contentQuality,
                contentDescription: data?.contentDescription,
                additionalMetadata: data?.additionalMetadata,
                createdAt: data?.createdAt,
            })
        })
        return data;
    }

    const columns = [
        {
            label: "TRACKID",
            name: "trackId",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "AMAZINGTAG",
            name: "sonicKey",
            options: {
                filter: false,
            }
        },
        {
            label: "TITLE",
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
            label: "VERSION",
            name: "version",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "ARTIST",
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
            label: "MUSICTYPE",
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
            label: "TUNECODE",
            name: "tuneCode",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "LABEL",
            name: "label",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "DISTRIBUTOR",
            name: "distributor",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "FILETYPE",
            name: "contentFileType",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "AUDIOLENGTH",
            name: "contentDuration",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value ? moment.utc(value * 1000).format("HH:mm:ss:SSS") || "---" : "---";
                }
            }
        },
        {
            label: "AUDIOSIZE(MB)",
            name: "contentSize",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value ? (value / 1024).toFixed(3) : "---";
                }
            }
        },
        {
            label: "UNDERLYING ENCODE OF FILE",
            name: "contentEncoding",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "SAMPLING FREQUENCY",
            name: "contentSamplingFrequency",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "QUALITY GRADE",
            name: "contentQuality",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value || "---";
                },
            },
        },
        {
            label: "DESCRIPTION",
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
            label: "ADDITIONAL METADATA",
            name: "additionalMetadata",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return JSON.stringify(value) || "---";
                },
            },
        },
        {
            label: "ENCODED DATE",
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
                    <FancyCard.CardHeader >
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Encodes Report</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all encoded AmazingTag
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
                                    exportData={true}
                                    handleExport={(data) => sonickeyStore.exportSonicKeysData(data)}
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
                            data={stableTableData() || []}
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
