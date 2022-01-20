import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent';
import FancyCard from '../../components/FancyCard/FancyCard';
import Table from '../../components/Table/Table';
import { useStore } from '../../stores'
import { log } from '../../utils/app.debug';
import RegisterUser from './components/RegisterUser';
import UserFinder from './components/UserFinder';

export default function Users() {
    const { userStore } = useStore();

    log("User store", userStore?.getUsers)

    const columns = [
        {
            label: "Username",
            name: "username",
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
            label: "Group",
            name: "groups",
            options: {
                customBodyRender: (value) => {
                    const group = value?.length > 0 ? value?.map(grp => {
                        return grp?.name
                    }) : "---";
                    return group;
                }
            }
        },
        {
            label: "Company",
            name: "companies",
            options: {
                customBodyRender: (value) => {
                    const companies = value?.length > 0 ? value?.map(cmp => {
                        return cmp?.name
                    }) : "---";
                    return companies;
                }
            }
        },
    ];

    const changePage = (currentPage) => {
        userStore.fetchUsers(currentPage === 0 ? 1 : currentPage + 1)
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
                                onChangePage: (currentPage) => { changePage(currentPage) },
                            }}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    )
}
