import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import FancyCard from '../../components/FancyCard/FancyCard'
import Table from '../../components/Table/Table'
import { useStore } from '../../stores'
import { log } from '../../utils/app.debug'
import AddGroup from './components/AddGroup'

export default function Group() {
    const { groupStore } = useStore()
    const columns = [
        {
            label: "Name",
            name: "name",
        },
        {
            label: "ID",
            name: "_id",
        }
    ]

    log("Group store", groupStore.getGroups)

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
                        loading={groupStore.loading}
                        error={groupStore.error}
                        onClickTryAgain={() => groupStore.fetchGroups()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    refreshButtonProps={{
                                        onClick: () => { groupStore.fetchGroups() },
                                    }}
                                    componentInsideDialog={<AddGroup />}
                                />
                            }
                            data={groupStore.getGroups || []}
                            columns={columns}
                            options={{
                                count: groupStore.getGroups?.length
                            }}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    )
}
