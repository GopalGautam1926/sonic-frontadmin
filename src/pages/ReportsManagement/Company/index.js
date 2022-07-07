import React from 'react'
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent'
import FancyCard from '../../../components/FancyCard/FancyCard'
import Table from '../../../components/Table/Table'
import { useStore } from '../../../stores';
import { log } from '../../../utils/app.debug';

export default function Company() {
    const { companyReportStore } = useStore();

    log("Company Report Store", companyReportStore)

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
            name: "plays",
        },
        {
            label: "Tracks",
            name: "tracks",
        },
        {
            label: "Artists",
            name: "artists",
        },
        {
            label: "Radio Stations",
            name: "radioStations",
        },
        {
            label: "Countries",
            name: "countries",
        }
    ]
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
                                // openDialogFilter={true}
                                refreshButtonProps={{
                                    onClick: () => companyReportStore.fetchCompaniesReports(),
                                }}
                            // componentInsideDialog={<AddCompany />}
                            // componentInsideDialogFilter={<FilterCompany />}
                            />
                        }
                        columns={columns}
                        data={companyReportStore?.company?.docs || []}
                        options={{
                            count: companyReportStore?.company?.docs?.length
                        }}
                    />
                </DataFetchingStateComponent>
            </FancyCard.CardContent>
        </FancyCard>
    )
}
