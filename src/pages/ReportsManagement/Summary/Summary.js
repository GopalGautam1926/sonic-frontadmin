import React from 'react'
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent'
import FancyCard from '../../../components/FancyCard/FancyCard'
import Table from '../../../components/Table/Table'
import { useStore } from '../../../stores';
import DataLoading from './Components/DataLoading';
import FilterCount from './Components/FilterCount';
import { utils, writeFile } from 'xlsx';

export default function Summary() {
    const { summaryCountStore } = useStore();

    const columns = [
        {
            label: "PARTNER",
            name: "partner",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <DataLoading
                        error={value.error}
                        loading={value.loading}
                        data={value.data}
                    />
                }
            }
        },
        {
            label: "COMPANY",
            name: "company",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <DataLoading
                        error={value.error}
                        loading={value.loading}
                        data={value.data}
                    />
                }
            }
        },
        {
            label: "ENCODES",
            name: "encodes",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <DataLoading
                        error={value.error}
                        loading={value.loading}
                        data={value.data}
                    />
                }
            }
        },
        {
            label: "PLAYS",
            name: "plays",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <DataLoading
                        error={value.error}
                        loading={value.loading}
                        data={value.data}
                    />
                }
            }
        },
        {
            label: "TRACKS",
            name: "tracks",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <DataLoading
                        error={value.error}
                        loading={value.loading}
                        data={value.data}
                    />
                }
            }
        },
    ]

    const tryAgain = () => {
        summaryCountStore?.fetchPartnersCount();
        summaryCountStore?.fetchCompanyCount();
        summaryCountStore?.fetchEncodesCount();
        summaryCountStore?.fetchPlaysCount();
        summaryCountStore?.fetchTracksCount();
    }

    const onSummaryStartDateChange = (date) => {
        summaryCountStore?.changeDateRange({ ...summaryCountStore?.dateRange, startDate: date })
        tryAgain()
    }

    const onSummaryEndDateChange = (date) => {
        summaryCountStore?.changeDateRange({ ...summaryCountStore?.dateRange, endDate: date })
        tryAgain()
    }

    const stableTableData = () => {
        return [{
            Partner: summaryCountStore.partnerCount.data,
            Company: summaryCountStore.companyCount.data,
            Encodes: summaryCountStore.encodesCount.data,
            Plays: summaryCountStore.playsCount.data,
            Tracks: summaryCountStore.tracksCount.data,
        }]
    }

    const onExportFile = (file) => {
        const headings = [['Partner', 'Company', 'Encodes', 'Plays', 'Tracks']];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, stableTableData(), { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');

        if (file === "xlsx") {
            writeFile(wb, 'Summary.xlsx');
        } else {
            writeFile(wb, 'Summary.csv');
        }
    }

    return (
        <FancyCard
            cardHeader={
                <FancyCard.CardHeader color="purple">
                    {(headerClasses) => (
                        <>
                            <h4 className={headerClasses.cardTitleWhite}>Summary</h4>
                            <p className={headerClasses.cardCategoryWhite}>
                                Summary of all reports
                            </p>
                        </>
                    )}
                </FancyCard.CardHeader>
            }
        >
            <FancyCard.CardContent style={{ zIndex: 0 }}>
                <DataFetchingStateComponent
                    loading={false}
                    error={null}
                    onClickTryAgain={tryAgain}
                >
                    <Table
                        title={
                            <Table.TableActions
                                exportData={true}
                                handleExport={(data) => onExportFile(data)}
                                filterOnly
                                openDialogFilter={true}
                                refreshButtonProps={{ onClick: tryAgain }}
                                componentInsideDialogFilter={<FilterCount />}
                                dateRange={true}
                                startDate={summaryCountStore?.dateRange?.startDate}
                                onChangeStartDate={(date) => onSummaryStartDateChange(date)}
                                endDate={summaryCountStore?.dateRange?.endDate}
                                onChangeEndDate={(date) => onSummaryEndDateChange(date)}
                            />
                        }
                        columns={columns}
                        data={[{ "partner": summaryCountStore.partnerCount, "company": summaryCountStore.companyCount, "encodes": summaryCountStore.encodesCount, "plays": summaryCountStore.playsCount, "tracks": summaryCountStore.tracksCount, }]}
                    />
                </DataFetchingStateComponent>
            </FancyCard.CardContent>
        </FancyCard>
    )
}
