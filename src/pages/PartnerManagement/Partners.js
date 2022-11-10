import React from "react";
import { useHistory } from "react-router-dom";
import Badge from "../../components/Badge/Badge";
import CustomPagination from "../../components/common/CustomPagination";
import DataFetchingStateComponent from "../../components/common/DataFetchingStateComponent";
import FancyCard from "../../components/FancyCard/FancyCard";
import RSpace from "../../components/rcomponents/RSpace";
import Table from "../../components/Table/Table";
import { getRouteNames } from "../../routes/routes.data";
import { useStore } from "../../stores";
import { log } from "../../utils/app.debug";
import AddPartner from "./components/AddPartner";
import FilterPartner from "./components/FilterPartner";

export default function Partners() {
  const { partnerStore } = useStore();
  const history = useHistory();

  React.useEffect(() => {
    partnerStore.fetchPartners();
  }, [// eslint-disable-line react-hooks/exhaustive-deps
    partnerStore?.getDateRange?.startDate,
    partnerStore?.getDateRange?.endDate,
  ]);

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
      label: "Type",
      name: "partnerType",
    },
    {
      label: "Admin",
      name: "owner",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value?.username || "--";
        },
      },
    },
    {
      label: "Status",
      name: "enabled",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const statusItem = [];
          if (value) {
            statusItem.push(
              <Badge
                color="success"
                size="small"
                label={<div style={{ fontSize: 11 }}>Active</div>}
              />
            );
          } else {
            statusItem.push(
              <Badge color="warning" size="small" label="Inactive" />
            );
          }
          log("enable data = ", value);

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
          const rowData = partnerStore?.getPartner?.docs?.find(
            (itm) => itm._id === value
          );
          return (
            <Table.TableRowAction
              enableDelete={false}
              viewButtonProps={{
                onClick: () => {
                  const path = `${getRouteNames()["cm_partner"]}/view/${value}`;
                  history.push({
                    pathname: path,
                    state: {
                      partner: rowData,
                    },
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
    partnerStore.fetchPartners(page);
    partnerStore.changePartnerTablePage(page);
  };

  log("partner data ", partnerStore?.getPartner?.docs);

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader>
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
                  addPlusFilter
                  openDialogWhenClickAdd={true}
                  openDialogFilter={true}
                  refreshButtonProps={{
                    onClick: () => partnerStore.fetchPartners(),
                  }}
                  componentInsideDialog={<AddPartner />}
                  componentInsideDialogFilter={<FilterPartner />}
                />
              }
              columns={columns}
              data={partnerStore?.getPartner?.docs || []}
              options={{
                count: partnerStore?.getPartner?.docs?.length || 0,
                customFooter: () => {
                  return (
                    <CustomPagination
                      totalPages={partnerStore?.getPartner?.totalPages}
                      page={partnerStore?.partnerTablePage}
                      onChange={(event, value) => onPageChange(value)}
                    />
                  );
                },
              }}
            />
          </DataFetchingStateComponent>
        </FancyCard.CardContent>
      </FancyCard>
    </div>
  );
}
