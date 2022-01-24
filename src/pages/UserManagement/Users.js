import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent';
import CustomPagination from '../../components/common/CustomPagination';
import FancyCard from '../../components/FancyCard/FancyCard';
import Table from '../../components/Table/Table';
import { useStore } from '../../stores'
import { log } from '../../utils/app.debug';
import RegisterUser from './components/RegisterUser';
import UserFinder from './components/UserFinder';

export default function Users() {
    const { userStore } = useStore();

    const [state, setState] = React.useState({
        userTablepage: 1
    })

    log("User store", userStore?.getUsers)

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
            label: "Phone Number",
            name: "phone_number",
            options: {
                customBodyRender: (value) => {
                    const number = value ? value : "---"
                    return number;
                }
            }
        },
        {
            label: "Groups",
            name: "groups",
            options: {
                customBodyRender: (value) => {
                    const group = value?.length > 0 ? value?.map(grp => {
                        return grp?.name
                    }).join() : "---";
                    return group;
                }
            }
        },
        {
            label: "Companies",
            name: "companies",
            options: {
                customBodyRender: (value) => {
                    const companies = value?.length > 0 ? value?.map(cmp => {
                        return cmp?.name
                    }).join() : "---";
                    return companies;
                }
            }
        },
    ];

    const onPageChange = (page) => {
        userStore.fetchUsers(page)
        setState({ ...state, userTablepage: page })
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
                <FancyCard.CardContent>
                    {/* <UserFinder
                        labelText={"User"}
                        onSelectUser={(user) => log("Selected user", user)}
                    /> */}
                    <DataFetchingStateComponent
                        loading={userStore.loading}
                        error={userStore.error}
                        onClickTryAgain={() => userStore.fetchUsers()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    refreshButtonProps={{
                                        onClick: () => userStore.fetchUsers(),
                                    }}
                                    componentInsideDialog={<RegisterUser />}
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
                                            page={state?.userTablepage}
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
