import React from 'react'
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent'
import FancyCard from '../../../components/FancyCard/FancyCard'
import Table from '../../../components/Table/Table'
import { useStore } from '../../../stores';
import { log } from '../../../utils/app.debug';
import DataLoading from './Components/DataLoading';
import FilterCount from './Components/FilterCount';

export default function Summary() {
    const { summaryCountStore } = useStore();

    const columns = [
        {
            label: "Partner",
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
            label: "Company",
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
            label: "Encodes",
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
            label: "Plays",
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
            label: "Tracks",
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
                                filterOnly
                                openDialogFilter={true}
                                refreshButtonProps={{ onClick: tryAgain }}
                                componentInsideDialogFilter={<FilterCount />}
                            // dateRange={true}
                            // startDate={companyReportStore?.dateRange?.startDate}
                            // onChangeStartDate={(date) => companyReportStore?.changeDateRange({ ...companyReportStore?.dateRange, startDate: date })}
                            // endDate={companyReportStore?.dateRange?.endDate}
                            // onChangeEndDate={(date) => companyReportStore?.changeDateRange({ ...companyReportStore?.dateRange, endDate: date })}
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
