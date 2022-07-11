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
    log("count of summary", summaryCountStore?.encodesCount)
    log("count of summary", summaryCountStore?.partnerCount)

    const columns = [
        {
            label: "Partner",
            name: "partner",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <DataLoading 
                    error={summaryCountStore?.partnerCount?.error}
                     loading={summaryCountStore?.partnerCount?.loading}
                     data={summaryCountStore?.partnerCount?.data}
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
                    error={summaryCountStore?.companyCount?.error}
                     loading={summaryCountStore?.companyCount?.loading}
                     data={summaryCountStore?.companyCount?.data}
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
                    error={summaryCountStore?.encodesCount?.error}
                     loading={summaryCountStore?.encodesCount?.loading}
                     data={summaryCountStore?.encodesCount?.data}
                     />
                }
            }
        },
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
                    loading={false}
                    error={null}
                    onClickTryAgain={() => summaryCountStore?.fetchEncodesCount()}
                >
                    <Table
                        title={
                            <Table.TableActions
                                filterOnly
                                openDialogFilter={true}
                                refreshButtonProps={{
                                    onClick: () => summaryCountStore?.fetchEncodesCount(),
                                }}
                                componentInsideDialogFilter={<FilterCount/>}
                                // dateRange={true}
                                // startDate={companyReportStore?.dateRange?.startDate}
                                // onChangeStartDate={(date) => companyReportStore?.changeDateRange({ ...companyReportStore?.dateRange, startDate: date })}
                                // endDate={companyReportStore?.dateRange?.endDate}
                                // onChangeEndDate={(date) => companyReportStore?.changeDateRange({ ...companyReportStore?.dateRange, endDate: date })}
                            />
                        }
                        columns={columns}
                        data={[{"partner":"0","company":"0","encodes":"03"},]}
                    />
                </DataFetchingStateComponent>
            </FancyCard.CardContent>
        </FancyCard>
    )
}
