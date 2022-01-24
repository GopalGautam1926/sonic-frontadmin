import { format } from 'date-fns'
import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import FancyCard from '../../components/FancyCard/FancyCard'
import Table from '../../components/Table/Table'
import { useStore } from '../../stores'
import { log } from '../../utils/app.debug'
import AddCompany from './components/AddCompany'

export default function Companies() {
    const { companyStore } = useStore()
    const columns = [
        {
            label: "Name",
            name: "name",
        },
        {
            label: "Id",
            name: "_id",
        },
        {
            label: "Email",
            name: "email",
        },
        {
            label: "Contact No",
            name: "contactNo",
        },
        {
            label: "Company Admin",
            name: "owner",
            options: {
                filter: false,
                customBodyRender: (value) => {

                    return value?.username || "--"
                }
            }
        }
    ]

    log("Company store", companyStore?.getCompany)

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="purple">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Companies</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all companies
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <FancyCard.CardContent>
                    <DataFetchingStateComponent
                        loading={companyStore.loading}
                        error={companyStore.error}
                        onClickTryAgain={() => companyStore.fetchCompanies()}
                    >
                        <Table
                            title={
                                < Table.TableActions
                                    refreshButtonProps={{
                                        onClick: () => companyStore.fetchCompanies(),
                                    }}
                                    componentInsideDialog={<AddCompany />}
                                />
                            }
                            columns={columns}
                            data={companyStore?.getCompany || []}
                            options={{
                                count: companyStore?.getCompany?.length
                            }}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    )
}
