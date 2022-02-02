import { Grid } from '@material-ui/core'
import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import DatePicker from '../../components/DatePicker/DatePicker'
import FancyCard from '../../components/FancyCard/FancyCard'
import Table from '../../components/Table/Table'
import { useStore } from '../../stores'
import { log } from '../../utils/app.debug'
import AddGroup from './components/AddGroup'
import FilterGroup from './components/FilterGroup'

export default function Group() {
    const { groupStore } = useStore()

    React.useEffect(() => {
        groupStore.fetchGroups();
    }, [groupStore?.getDateRange?.startDate, groupStore?.getDateRange?.endDate])

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
                {/* <Grid container style={{ padding: "0px 20px", display: 'flex', justifyContent: 'flex-end', zIndex: 1 }}>
                    <Grid item>
                        <DatePicker
                            label="Start Date"
                            selected={groupStore?.getDateRange?.startDate}
                            onChange={(date) => groupStore?.changeDateRange({ ...groupStore?.getDateRange, startDate: date })}
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            showMonthDropdown
                            startDate={groupStore?.getDateRange?.startDate}
                            endDate={groupStore?.getDateRange?.endDate}
                        />
                    </Grid>
                    <Grid item className="mt-4 mx-3">
                        <p style={{ fontSize: '14px' }}>TO</p>
                    </Grid>

                    <Grid item>
                        <DatePicker
                            label="End Date"
                            selected={groupStore?.getDateRange?.endDate}
                            onChange={(date) => groupStore?.changeDateRange({ ...groupStore?.getDateRange, endDate: date })}
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            showMonthDropdown
                            startDate={groupStore?.getDateRange?.startDate}
                            endDate={groupStore?.getDateRange?.endDate}
                        />
                    </Grid>
                </Grid> */}

                <FancyCard.CardContent style={{ zIndex: 0 }}>
                    <DataFetchingStateComponent
                        loading={groupStore.loading}
                        error={groupStore.error}
                        onClickTryAgain={() => groupStore.fetchGroups()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    // addPlusFilter
                                    openDialogWhenClickAdd={true}
                                    // openDialogFilter={true}
                                    refreshButtonProps={{
                                        onClick: () => { groupStore.fetchGroups() },
                                    }}
                                    componentInsideDialog={<AddGroup />}
                                // componentInsideDialogFilter={<FilterGroup />}
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
