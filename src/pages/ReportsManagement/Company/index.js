import React from 'react'
import CustomPagination from '../../../components/common/CustomPagination';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent'
import FancyCard from '../../../components/FancyCard/FancyCard'
import Table from '../../../components/Table/Table'
import { useStore } from '../../../stores';
import FilterCompanyReport from './Components/FilterCompanyReport';
import HighLevelCounts from './Components/HighLevelCounts';
import { utils, writeFile } from 'xlsx';

export default function Company() {
    const { companyReportStore } = useStore();

    const columns = [
        {
            label: "COMPANY",
            name: "name",
        },
        {
            label: "ENCODES",
            name: "encodesCount",
        },
        {
            label: "PLAYS",
            name: "_id",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const company = companyReportStore?.companyReport?.docs?.find(company => company?._id === value)
                    return <HighLevelCounts company={company} plays={true} />
                }
            }
        },
        {
            label: "TRACKS",
            name: "_id",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const company = companyReportStore?.companyReport?.docs?.find(company => company?._id === value)
                    return <HighLevelCounts company={company} tracks={true} />
                }
            }
        },
        {
            label: "ARTISTS",
            name: "_id",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const company = companyReportStore?.companyReport?.docs?.find(company => company?._id === value)
                    return <HighLevelCounts company={company} artists={true} />
                }
            }
        },
        {
            label: "RADIO STATIONS",
            name: "_id",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const company = companyReportStore?.companyReport?.docs?.find(company => company?._id === value)
                    return <HighLevelCounts company={company} radioStations={true} />
                }
            }
        },
        {
            label: "COUNTRIES",
            name: "_id",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const company = companyReportStore?.companyReport?.docs?.find(company => company?._id === value)
                    return <HighLevelCounts company={company} countries={true} />
                }
            }
        }
    ]

    const onPageChange = (page) => {
        companyReportStore.fetchCompaniesReports(page)
    }

    const stableTableData = () => {
        const data = companyReportStore?.companyReport?.docs?.map((data) => {
            return ({
                Company: data?.name,
                Encodes: data?.encodesCount,
                Plays: data?.highLevelCountData?.myPlaysCount,
                Tracks: data?.highLevelCountData?.myTracksCount,
                Artists: data?.highLevelCountData?.myArtistsCount,
                RadioStations: data?.highLevelCountData?.myRadioStationCount,
                Countries: data?.highLevelCountData?.myCountriesCount,
            })
        })
        return data;
    }

    const onExportFile = (file) => {
        const headings = [['Company', 'Encodes', 'Plays', 'Tracks', 'Artists', 'Radio Stations', 'Countries']];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, stableTableData(), { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');

        if (file === "xlsx") {
            writeFile(wb, 'Company Report.xlsx');
        } else {
            writeFile(wb, 'Company Report.csv');
        }
    }

    return (
        <FancyCard
            cardHeader={
                <FancyCard.CardHeader >
                    {(headerClasses) => (
                        <>
                            <h4 className={headerClasses.cardTitleWhite}>Company Report</h4>
                            <p className={headerClasses.cardCategoryWhite}>
                                Reports of all companies
                            </p>
                        </>
                    )}
                </FancyCard.CardHeader>
            }
        >
            <FancyCard.CardContent style={{ zIndex: 0 }}>
                <DataFetchingStateComponent
                    loading={companyReportStore.loading}
                    error={companyReportStore.error}
                    onClickTryAgain={() => companyReportStore.fetchCompaniesReports()}
                >
                    <Table
                        title={
                            <Table.TableActions
                                exportData={true}
                                handleExport={(data) => onExportFile(data)}
                                filterOnly
                                openDialogFilter={true}
                                refreshButtonProps={{
                                    onClick: () => companyReportStore.fetchCompaniesReports(),
                                }}
                                componentInsideDialogFilter={<FilterCompanyReport />}
                                dateRange={true}
                                startDate={companyReportStore?.dateRange?.startDate}
                                onChangeStartDate={(date) => companyReportStore?.changeDateRange({ ...companyReportStore?.dateRange, startDate: date })}
                                endDate={companyReportStore?.dateRange?.endDate}
                                onChangeEndDate={(date) => companyReportStore?.changeDateRange({ ...companyReportStore?.dateRange, endDate: date })}
                            />
                        }
                        columns={columns}
                        data={companyReportStore?.companyReport?.docs || []}
                        options={{
                            count: companyReportStore?.companyReport?.docs?.length,
                            customFooter: () => {
                                return (
                                    <CustomPagination
                                        totalPages={companyReportStore?.companyReport?.totalPages}
                                        page={companyReportStore?.companyReport?.page}
                                        onChange={(event, value) => onPageChange(value)}
                                    />
                                );
                            }
                        }}
                    />
                </DataFetchingStateComponent>
            </FancyCard.CardContent>
        </FancyCard>
    )
}
