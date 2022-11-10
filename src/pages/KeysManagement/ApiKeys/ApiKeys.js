import React, { useState } from "react";
import FancyCard from "../../../components/FancyCard/FancyCard";
import Table from "../../../components/Table/Table";
import AddApiKey from "./components/AddApiKey";
import { useHistory } from "react-router-dom";
import { getRouteNames } from "../../../routes/routes.data";
import { format } from "date-fns";
import { isExpired } from "../../../utils/general.utils";
import RSpace from "../../../components/rcomponents/RSpace";
import { useStore } from "../../../stores";
import DataFetchingStateComponent from "../../../components/common/DataFetchingStateComponent";
import apikeysHttps from "../../../services/https/resources/apikeys.https";
import { toast } from "react-toastify";
import Badge from '../../../components/Badge/Badge';
import CustomPagination from "../../../components/common/CustomPagination";

function ApiKeys() {
  const [state, setState] = useState({
    isDeleting: false,
    deletigKey: ''
  });
  const history = useHistory();
  const { apiKeyStore } = useStore();
  const columns = [
    {
      label: "Key",
      name: "_id",
    },
    {
      label: "Customer",
      name: "customer",
      options: {
        filter: false,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          return value?.username || "--";
        },
      },
    },
    {
      label: "Company",
      name: "company",
      options: {
        filter: false,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          return value?.name || "--";
        },
      },
    },
    {
      label: "Validity",
      name: "validity",
      options: {
        filter: false,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          const validity = value ? format(new Date(value), "dd/MM/yyyy") : "--";
          return validity;
        },
      },
    },
    {
      label: "Status",
      name: "_id",
      options: {
        filter: false,
        customBodyRender: (
          value,
          { rowIndex, columnIndex, currentTableData },
          updateValue
        ) => {
          const rowData = apiKeyStore.getApiKeys.docs.find(
            (itm) => itm._id === value
          );
          const statusItem = [];
          if (rowData?.disabled) {
            statusItem.push(
              <Badge color="rose" size="small" label="Disabled" />
            );
          }
          if (rowData?.suspended) {
            statusItem.push(
              <Badge color="warning" size="small" label="Suspended" />
            );
          }
          if (isExpired(rowData?.validity)) {
            statusItem.push(
              <Badge color="danger" size="small" label="Expired" />
            );
          }
          if (statusItem.length === 0) {
            statusItem.push(
              <Badge color="success" size="small" label="Active" />
            );
          }

          return (
            <RSpace>
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
          const rowData = apiKeyStore.getApiKeys.docs.find(
            (itm) => itm._id === value
          );
          return (
            <Table.TableRowAction
              enableDelete={false}
              viewButtonProps={{
                onClick: () => {
                  const path = `${getRouteNames()["km_apikeys"]
                    }/view/${value}`;
                  history.push({
                    pathname: path,
                    state: {
                      apiKey: rowData
                    }
                  });
                },
              }}
              deletePopConfirmProps={{
                onClickYes: () => onDeleteKey(value)
              }}
              deleteButtonProps={{
                loading: (state.isDeleting && value === state.deletigKey),
              }}
            />
          );
        },
      },
    },
  ];

  const onDeleteKey = (key) => {
    setState({ ...state, isDeleting: true, deletigKey: key });
    apikeysHttps
      .deleteApiKey(key)
      .then(({ data }) => {
        toast.success("Deleted");
        setState({ ...state, isDeleting: false, deletigKey: '' });
      })
      .catch((err) => {
        toast.error("Error while deteting");
        setState({ ...state, isDeleting: false, deletigKey: '' });
      });
  };

  const onPageChange = (page) => {
    apiKeyStore.fetchApiKeys(page)
    apiKeyStore.changeApiKeyTablePage(page);
}

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader >
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>Api Keys</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  List of all api keys
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <FancyCard.CardContent>
          <DataFetchingStateComponent
            loading={apiKeyStore.loading}
            error={apiKeyStore.error}
            onClickTryAgain={() => apiKeyStore.fetchApiKeys()}
          >
            <Table
              title={
                <Table.TableActions
                  openDialogWhenClickAdd={true}
                  refreshButtonProps={{
                    onClick: () => apiKeyStore.fetchApiKeys(),
                  }}
                  componentInsideDialog={<AddApiKey />}
                />
              }
              data={apiKeyStore.getApiKeys?.docs || []}
              columns={columns}
              options={{
                count: apiKeyStore.getApiKeys.totalDocs || 0,
                customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
                    return (
                        <CustomPagination
                            totalPages={apiKeyStore?.getApiKeys?.totalPages}
                            page={apiKeyStore?.apiKeyTablePage}
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
  );
}

export default ApiKeys;
