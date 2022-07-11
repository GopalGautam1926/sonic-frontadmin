import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent';
import CustomPagination from '../../components/common/CustomPagination';
import FancyCard from '../../components/FancyCard/FancyCard';
import Table from '../../components/Table/Table';
import { useStore } from '../../stores'
import RegisterUser from './components/RegisterUser';
import { getRouteNames } from '../../routes/routes.data';
import { useHistory } from 'react-router-dom';
import FilterUser from './components/FilterUser';
import { userRoles } from '../../constants';
import Badge from '../../components/Badge/Badge';
import RSpace from '../../components/rcomponents/RSpace';

export default function Users() {
    const { userStore } = useStore();
    const history = useHistory();

    React.useEffect(() => {
        userStore.changeUserTablePage(1);
        userStore.fetchUsers();
    }, [userStore?.getDateRange?.startDate, userStore?.getDateRange?.endDate, userStore?.getUsers?.totalDocs])

    const columns = [
        {
            label: "Username",
            name: "username",
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
            label: "PhoneNumber",
            name: "phone_number",
            options: {
                customBodyRender: (value) => {
                    const number = value || "---"
                    return number;
                }
            }
        },
        {
            label: "AccountType",
            name: "userRole",
            options: {
                customBodyRender: (value) => {
                    if (!value) return "---";

                    if (value === userRoles.ADMIN) {
                        return "Super Admin"
                    }
                    return value
                }
            }
        },
        {
            label: "Account Name",
            name: "_id",
            options: {
                customBodyRender: (value) => {
                    const rowData = userStore.getUsers.docs.find(
                        (itm) => itm._id == value
                    );
                    if (rowData?.userRole === userRoles.PARTNER_ADMIN || rowData?.userRole === userRoles.PARTNER_USER) {
                        return rowData?.partner?.name
                    } else if (rowData?.userRole === userRoles.COMPANY_ADMIN || rowData?.userRole === userRoles.COMPANY_USER) {
                        return rowData?.company?.name
                    }
                    return "---"
                }
            }
        },
        {
            label: "UserType",
            name: "userRole",
            options: {
                customBodyRender: (value) => {
                    if (value === userRoles.ADMIN) {
                        return "Super Admin"
                    }
                    else if (value === userRoles.PARTNER_ADMIN || value === userRoles.COMPANY_ADMIN) {
                        return "Admin"
                    } else if (value === userRoles.PARTNER_USER || value === userRoles.COMPANY_USER || value === userRoles.PORTAL_USER) {
                        return "Standard"
                    }
                    return "---"
                }
            },
        },
        {
            label: "Status",
            name: "enabled",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const statusItem = [];
                    if (!value) {
                        statusItem.push(
                            <Badge color="error" size="small" label={<div style={{ fontSize: 11 }}>Inactive</div>} />
                        );
                    }
                    if (value) {
                        statusItem.push(
                            <Badge color="success" size="small" label={<div style={{ fontSize: 11 }}>Active</div>} />
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
                    const rowData = userStore.getUsers.docs.find(
                        (itm) => itm._id == value
                    );
                    return (
                        <Table.TableRowAction
                            enableDelete={false}
                            viewButtonProps={{
                                onClick: () => {
                                    const path = `${getRouteNames()["um_users"]
                                        }/view/${value}`;
                                    history.push({
                                        pathname: path,
                                        state: {
                                            user: rowData
                                        }
                                    });
                                },
                            }}
                        />
                    );
                },
            },
        },
    ];

    const onPageChange = (page) => {
        userStore.fetchUsers(page)
        userStore?.changeUserTablePage(page);
    }

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="success">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Users</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all users
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <FancyCard.CardContent style={{ zIndex: 0 }}>
                    <DataFetchingStateComponent
                        loading={userStore.loading}
                        error={userStore.error}
                        onClickTryAgain={() => userStore.fetchUsers()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    addPlusFilter
                                    openDialogWhenClickAdd={true}
                                    openDialogFilter={true}
                                    refreshButtonProps={{
                                        onClick: () => userStore.fetchUsers(),
                                    }}
                                    componentInsideDialog={<RegisterUser />}
                                    componentInsideDialogFilter={<FilterUser />}
                                    dateRange={true}
                                    startDate={userStore?.getDateRange?.startDate}
                                    onChangeStartDate={(date) => userStore?.changeDateRange({ ...userStore?.getDateRange, startDate: date })}
                                    endDate={userStore?.getDateRange?.endDate}
                                    onChangeEndDate={(date) => userStore?.changeDateRange({ ...userStore?.getDateRange, endDate: date })}
                                />
                            }
                            data={userStore?.getUsers?.docs || []}
                            columns={columns}
                            options={{
                                count: userStore?.getUsers?.totalDocs || 0,
                                customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
                                    return (
                                        <CustomPagination
                                            totalPages={userStore?.getUsers?.totalPages}
                                            page={userStore?.userTablePage}
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
