import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent';
import FancyCard from '../../components/FancyCard/FancyCard';
import Table from '../../components/Table/Table';
import { useStore } from '../../stores'
import RegisterUser from './components/RegisterUser';

export default function Users() {
    const [values, setValues] = React.useState({

    })
    const { userStore } = useStore();

    const columns = [
        // {
        //     label: "Name",
        //     name: "name",
        // },
    ];

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
                    <DataFetchingStateComponent
                        loading={userStore.loading}
                        error={userStore.error}
                        onClickTryAgain={() => userStore.fetchAllUsers()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    refreshButtonProps={{
                                        onClick: () => userStore.fetchAllUsers(),
                                    }}
                                    componentInsideDialog={<RegisterUser />}
                                />
                            }
                            //   data={licenseKeyStore.createTableData()}
                            columns={columns}
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
