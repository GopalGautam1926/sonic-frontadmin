import React from 'react'
import { useHistory } from 'react-router-dom'
import Badge from '../../components/Badge/Badge'
import CustomPagination from '../../components/common/CustomPagination'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import FancyCard from '../../components/FancyCard/FancyCard'
import RSpace from '../../components/rcomponents/RSpace'
import Table from '../../components/Table/Table'
import { getRouteNames } from '../../routes/routes.data'
import { useStore } from '../../stores'
import AddCompany from './components/AddCompany'
import FilterCompany from './components/FilterCompany'

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
            label: "Type",
            name: "companyType",
        },
        {
            label: "URN/ID",
            name: "companyUrnOrId",
        },
        {
            label: "Admin",
            name: "owner",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.username || "--"
                }
            }
        },
        {
            label: "Email",
            name: "owner",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.email || "--"
                }
            }
        },
        {
            label: "Phone Number",
            name: "owner",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return value?.phone_number || "--"
                }
            }
        },
        {
            label: "Status",
            name: "enabled",
            options: {
                filter: false,
                customBodyRender: (
                    value
                ) => {
                    const statusItem = [];
                    if (value) {
                        statusItem.push(
                            <Badge color="success" size="small" label={<div style={{ fontSize: 11 }}>Active</div>} />
                        );
                    }
                    else {
                        statusItem.push(
                            <Badge color="warning" size="small" label="Inactive" />
                        );
                    }

                    return (
                        <RSpace style={{}}>
                            {statusItem.map((status) => (
                                <RSpace.Item>{status}</RSpace.Item>
                            ))}
                        </RSpace>
                    );
                },
            },
        },
        {
            label: "Actions",
            name: "_id",
            options: {
                filter: false,
                customBodyRender: (value, { columnIndex }, updateValue) => {
                    const rowData = companyStore.getCompany.docs?.find(
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
        },
    ]

    const onPageChange = (page) => {
        companyStore.fetchCompanies(page)
        companyStore.changeCompanyTablePage(page);
    }

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
                <FancyCard.CardContent style={{ zIndex: 0 }}>
                    <DataFetchingStateComponent
                        loading={companyStore.loading}
                        error={companyStore.error}
                        onClickTryAgain={() => companyStore.fetchCompanies()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    addPlusFilter
                                    openDialogWhenClickAdd={true}
                                    openDialogFilter={true}
                                    refreshButtonProps={{
                                        onClick: () => companyStore.fetchCompanies(),
                                    }}
                                    componentInsideDialog={<AddCompany />}
                                    componentInsideDialogFilter={<FilterCompany />}
                                />
                            }
                            columns={columns}
                            data={companyStore?.getCompany?.docs || []}
                            options={{
                                count: companyStore?.getCompany?.docs?.length || 0,
                                customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
                                    return (
                                        <CustomPagination
                                            totalPages={companyStore?.getCompany?.totalPages}
                                            page={companyStore?.companyTablePage}
                                            onChange={(event, value) => onPageChange(value)}
                                        />
                                    );
                                }
                            }}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    )
}
