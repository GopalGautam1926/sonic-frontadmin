import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import FancyCard from '../../components/FancyCard/FancyCard'
import Table from '../../components/Table/Table'
import AddCompany from './components/AddCompany'

export default function Companies() {
    const columns = [
        {
            label: "Name",
            name: "name",
        },
        {
            label: "Owner",
            name: "owner",
        }
    ]

    const data = [
        ["Arba", "Arun"]
    ]
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
                        loading={false}
                        error={null}
                    // onClickTryAgain={() => }
                    >
                        <Table
                            title={
                                < Table.TableActions
                                    refreshButtonProps={{
                                        // onClick: () => licenseKeyStore.fetchLicenseKeys(),
                                    }}
                                    componentInsideDialog={<AddCompany />}
                                />
                            }
                            columns={columns}
                            data={data}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    )
}
