import React from 'react'
import { useHistory } from 'react-router-dom'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import FancyCard from '../../components/FancyCard/FancyCard'
import Table from '../../components/Table/Table'
import { getRouteNames } from '../../routes/routes.data'
import { useStore } from '../../stores'
import AddCompany from './components/AddCompany'

export default function Companies() {
    const { companyStore } = useStore();
    const history = useHistory();

    React.useEffect(() => {
        companyStore.fetchCompanies();
    }, [companyStore?.getDateRange?.startDate, companyStore?.getDateRange?.endDate])

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
        },
        {
            label: "Actions",
            name: "_id",
            options: {
                filter: false,
                customBodyRender: (value, { columnIndex }, updateValue) => {
                    const rowData = companyStore.getCompany.find(
                        (itm) => itm._id == value
                    );
                    return (
                        <Table.TableRowAction
                            enableDelete={false}
                            viewButtonProps={{
                                onClick: () => {
                                    const path = `${getRouteNames()["cm_company"]
                                        }/view/${value}`;
                                    history.push({
                                        pathname: path,
                                        state: {
                                            company: rowData
                                        }
                                    });
                                },
                            }}
                        />
                    );
                },
            },
        }
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
                {/* <Grid container style={{ padding: "0px 20px", display: 'flex', justifyContent: 'flex-end', zIndex: 1 }}>
                    <Grid item>
                        <DatePicker
                            label="Start Date"
                            selected={companyStore?.getDateRange?.startDate}
                            onChange={(date) => companyStore?.changeDateRange({ ...companyStore?.getDateRange, startDate: date })}
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            showMonthDropdown
                            startDate={companyStore?.getDateRange?.startDate}
                            endDate={companyStore?.getDateRange?.endDate}
                        />
                    </Grid>
                    <Grid item className="mt-4 mx-3">
                        <p style={{ fontSize: '14px' }}>TO</p>
                    </Grid>

                    <Grid item>
                        <DatePicker
                            label="End Date"
                            selected={companyStore?.getDateRange?.endDate}
                            onChange={(date) => companyStore?.changeDateRange({ ...companyStore?.getDateRange, endDate: date })}
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            showMonthDropdown
                            startDate={companyStore?.getDateRange?.startDate}
                            endDate={companyStore?.getDateRange?.endDate}
                        />
                    </Grid>
                </Grid> */}

                <FancyCard.CardContent style={{ zIndex: 0 }}>
                    <DataFetchingStateComponent
                        loading={companyStore.loading}
                        error={companyStore.error}
                        onClickTryAgain={() => companyStore.fetchCompanies()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    // addPlusFilter
                                    openDialogWhenClickAdd={true}
                                    // openDialogFilter={true}
                                    refreshButtonProps={{
                                        onClick: () => companyStore.fetchCompanies(),
                                    }}
                                    componentInsideDialog={<AddCompany />}
                                // componentInsideDialogFilter={<FilterCompany />}
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
