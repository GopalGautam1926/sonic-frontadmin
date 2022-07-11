import { Grid } from '@material-ui/core';
import React from 'react'
import CustomPagination from '../../../components/common/CustomPagination';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent'
import DatePicker from '../../../components/DatePicker/DatePicker';
import FancyCard from '../../../components/FancyCard/FancyCard'
import Table from '../../../components/Table/Table'
import { useStore } from '../../../stores';
import { log } from '../../../utils/app.debug';
import FilterCompanyReport from './Components/FilterCompanyReport';
import HighLevelCounts from './Components/HighLevelCounts';

export default function Company() {
    const { companyReportStore } = useStore();

    log("Company Report Store", companyReportStore?.companyReport)

    const columns = [
        {
            label: "Company",
            name: "name",
        },
        {
            label: "Encodes",
            name: "encodesCount",
        },
        {
            label: "Plays",
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
            label: "Tracks",
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
            label: "Artists",
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
            label: "Radio Stations",
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
            label: "Countries",
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

    return (
        <FancyCard
            cardHeader={
                <FancyCard.CardHeader color="purple">
                    {(headerClasses) => (
                        <>
                            <h4 className={headerClasses.cardTitleWhite}>Companies</h4>
                            <p className={headerClasses.cardCategoryWhite}>
                                Reports of all companies
                            </p>
                        </>
                    )}
                </FancyCard.CardHeader>
            }
        >
            <Grid container style={{ padding: "0px 20px", display: 'flex', justifyContent: 'flex-end', zIndex: 1 }}>
                <Grid item>
                    <DatePicker
                        label="Start Date"
                        selected={companyReportStore?.dateRange?.startDate}
                        onChange={(date) => companyReportStore?.changeDateRange({ ...companyReportStore?.dateRange, startDate: date })}
                        showYearDropdown
                        dateFormat="dd/MM/yyyy"
                        yearDropdownItemNumber={15}
                        scrollableYearDropdown
                        showMonthDropdown
                        startDate={companyReportStore?.dateRange?.startDate}
                        endDate={companyReportStore?.dateRange?.endDate}
                    />
                </Grid>
                <Grid item className="mt-4 mx-3">
                    <p style={{ fontSize: '14px' }}>TO</p>
                </Grid>

                <Grid item>
                    <DatePicker
                        label="End Date"
                        selected={companyReportStore?.dateRange?.endDate}
                        onChange={(date) => companyReportStore?.changeDateRange({ ...companyReportStore?.dateRange, endDate: date })}
                        showYearDropdown
                        dateFormat="dd/MM/yyyy"
                        yearDropdownItemNumber={15}
                        scrollableYearDropdown
                        showMonthDropdown
                        startDate={companyReportStore?.dateRange?.startDate}
                        endDate={companyReportStore?.dateRange?.endDate}
                    />
                </Grid>
            </Grid>

            <FancyCard.CardContent style={{ zIndex: 0 }}>
                <DataFetchingStateComponent
                    loading={companyReportStore.loading}
                    error={companyReportStore.error}
                    onClickTryAgain={() => companyReportStore.fetchCompaniesReports()}
                >
                    <Table
                        title={
                            <Table.TableActions
                                addPlusFilter
                                // openDialogWhenClickAdd={true}
                                openDialogFilter={true}
                                refreshButtonProps={{
                                    onClick: () => companyReportStore.fetchCompaniesReports(),
                                }}
                                // componentInsideDialog={<AddCompany />}
                                componentInsideDialogFilter={<FilterCompanyReport />}
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
