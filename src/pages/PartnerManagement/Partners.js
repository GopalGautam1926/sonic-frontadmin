import React from 'react'
import { useHistory } from 'react-router-dom'
import CustomPagination from '../../components/common/CustomPagination'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import FancyCard from '../../components/FancyCard/FancyCard'
import Table from '../../components/Table/Table'
import { getRouteNames } from '../../routes/routes.data'
import { useStore } from '../../stores'
import AddPartner from './components/AddPartner'

export default function Partners() {
    const { partnerStore } = useStore();
    const history = useHistory();

    React.useEffect(() => {
        partnerStore.fetchPartners();
    }, [partnerStore?.getDateRange?.startDate, partnerStore?.getDateRange?.endDate])

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
            options: {
                customBodyRender: (value) => {
                    return value || "--";
                }
            }
        },
        {
            label: "Owner",
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
                    const rowData = partnerStore?.getPartner?.docs?.find(
                        (itm) => itm._id == value
                    );
                    return (
                        <Table.TableRowAction
                            enableDelete={false}
                            viewButtonProps={{
                                onClick: () => {
                                    const path = `${getRouteNames()["cm_partner"]
                                        }/view/${value}`;
                                    history.push({
                                        pathname: path,
                                        state: {
                                            partner: rowData
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

    const onPageChange = (page) => {
        partnerStore.fetchPartners(page)
        partnerStore.changePartnerTablePage(page);
    }

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="purple">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Partners</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all partners
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >

                <FancyCard.CardContent style={{ zIndex: 0 }}>
                    <DataFetchingStateComponent
                        loading={partnerStore.loading}
                        error={partnerStore.error}
                        onClickTryAgain={() => partnerStore.fetchPartners()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    // addPlusFilter
                                    openDialogWhenClickAdd={true}
                                    // openDialogFilter={true}
                                    refreshButtonProps={{
                                        onClick: () => partnerStore.fetchPartners(),
                                    }}
                                    componentInsideDialog={<AddPartner />}
                                // componentInsideDialogFilter={<FilterCompany />}
                                />
                            }
                            columns={columns}
                            data={partnerStore?.getPartner?.docs || []}
                            options={{
                                count: partnerStore?.getPartner?.docs?.length || 0,
                                customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
                                    return (
                                        <CustomPagination
                                            totalPages={partnerStore?.getPartner?.totalPages}
                                            page={partnerStore?.userTablePage}
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