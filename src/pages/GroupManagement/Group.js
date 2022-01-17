import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import FancyCard from '../../components/FancyCard/FancyCard'
import Table from '../../components/Table/Table'
import FilterPlays from '../SonicKeyManagement/components/FilterPlays'

export default function Group() {
    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="success">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Groups</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all groups
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <FancyCard.CardContent>
                    <DataFetchingStateComponent
                    // loading={licenseKeyStore.loading}
                    // error={licenseKeyStore.error}
                    // onClickTryAgain={() => licenseKeyStore.fetchLicenseKeys()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    refreshButtonProps={{
                                        onClick: () => { },
                                    }}
                                    componentInsideDialog={<FilterPlays />}
                                />
                            }
                        //   data={licenseKeyStore.createTableData()}
                        // columns={columns}
                        //   options={{
                        //     count:licenseKeyStore.getLicenseKeys.totalDocs
                        //   }}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    )
}
