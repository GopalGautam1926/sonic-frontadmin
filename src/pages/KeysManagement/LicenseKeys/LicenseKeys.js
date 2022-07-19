import React, { useEffect, useState } from "react";
import FancyCard from "../../../components/FancyCard/FancyCard";
import Table from "../../../components/Table/Table";
import AddLicenseKeys from "./components/AddLicenseKey";
import { useHistory, useLocation } from "react-router-dom";
import { getRouteNames } from "../../../routes/routes.data";
import { format } from "date-fns";
import { isExpired } from "../../../utils/general.utils";
import RSpace from "../../../components/rcomponents/RSpace";
import useStyle from "./styles";
import { useStore } from "../../../stores";
import DataFetchingStateComponent from "../../../components/common/DataFetchingStateComponent";
import licensekeysHttps from "../../../services/https/resources/licensekeys.https";
import { toast } from "react-toastify";
import Badge from '../../../components/Badge/Badge';
import { log } from '../../../utils/app.debug';
import CustomPagination from "../../../components/common/CustomPagination";
function LicenseKeys() {
  const [state, setState] = useState({
    isDeleting: false,
    deletigKey: ''
  });
  const history = useHistory();
  const { licenseKeyStore, companyStore } = useStore();
  const classes = useStyle()
  const columns = [
    {
      label: "Name",
      name: "name",
    },
    {
      label: "Key",
      name: "key",
    },
    {
      label: "Max uses (encode)",
      name: "maxEncodeUses",
      options: {
        display: true
      }
    },
    {
      label: "Uses (encode)",
      name: "encodeUses",
      options: {
        display: true
      }
    },
    {
      label: "Max uses (monitor)",
      name: "maxMonitoringUses",
      options: {
        display: true
      }
    },
    {
      label: "Uses (monitor)",
      name: "monitoringUses",
      options: {
        display: true
      }
    },
    {
      label: "Type",
      name: "type",
      options: {
        display: true,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          const type = value || "Individual";
          return type;
        },
      }
    },
    {
      label: "Company",
      name: "company",
      options: {
        display: true,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          const company = value?.name || "--";
          return company;
        },
      }
    },
    {
      label: "Users",
      name: "totalUsers",
      options: {
        filter: false,
      }
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
      name: "key",
      options: {
        filter: false,
        customBodyRender: (
          value,
          { rowIndex, columnIndex, currentTableData },
          updateValue
        ) => {
          const rowData = licenseKeyStore.getLicenseKeys.docs.find(
            (itm) => itm.key == value
          );
          const statusItem = [];
          if (rowData?.disabled) {
            statusItem.push(
              <Badge color="rose" size="small" label={<div style={{ fontSize: 11 }}>Disabled</div>} />
            );
          }
          if (rowData?.suspended) {
            statusItem.push(
              <Badge color="warning" size="small" label={<div style={{ fontSize: 11 }}>Suspended</div>} />
            );
          }
          if (isExpired(rowData?.validity)) {
            statusItem.push(
              <Badge color="danger" size="small" label={<div style={{ fontSize: 11 }}>Expired</div>} />
            );
          }
          if (statusItem.length == 0) {
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
      name: "key",
      options: {
        filter: false,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          const rowData = licenseKeyStore.getLicenseKeys.docs.find(
            (itm) => itm.key == value
          );
          return (
            <Table.TableRowAction
              enableDelete={false}
              viewButtonProps={{
                onClick: () => {
                  const path = `${getRouteNames()["km_licensekeys"]
                    }/view/${value}`;
                  history.push({
                    pathname: path,
                    state: {
                      license: rowData
                    }
                  });
                },
              }}
              deletePopConfirmProps={{
                onClickYes: () => onDeleteKey(value)
              }}
              deleteButtonProps={{
                loading: (state.isDeleting && value == state.deletigKey),
              }}
            />
          );
        },
      },
    },
  ];

  const onDeleteKey = (key) => {
    setState({ ...state, isDeleting: true, deletigKey: key });
    licensekeysHttps
      .deleteLicense(key)
      .then(({ data }) => {
        toast.success("Deleted");
        setState({ ...state, isDeleting: false, deletigKey: '' });
      })
      .catch((err) => {
        toast.error("Error while deteting");
        setState({ ...state, isDeleting: false, deletigKey: '' });
      });
  };

  log("companyStore data", licenseKeyStore.getLicenseKeys);


  const onPageChange = (page) => {
    licenseKeyStore.fetchLicenseKeys(page)
    licenseKeyStore.changeLicenseKeyTablePage(page);
}

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader color="purple">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>Licenses</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  List of all licenses
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <FancyCard.CardContent>
          <DataFetchingStateComponent
            loading={licenseKeyStore.loading}
            error={licenseKeyStore.error}
            onClickTryAgain={() => licenseKeyStore.fetchLicenseKeys()}
          >
            <Table
              title={
                <Table.TableActions
                  openDialogWhenClickAdd={true}
                  refreshButtonProps={{
                    onClick: () => licenseKeyStore.fetchLicenseKeys(),
                  }}
                  componentInsideDialog={<AddLicenseKeys />}
                />
              }
              data={licenseKeyStore.createTableData()}
              columns={columns}
              options={{
                count: licenseKeyStore.getLicenseKeys.totalDocs || 0,
                customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
                    return (
                        <CustomPagination
                            totalPages={licenseKeyStore?.getLicenseKeys?.totalPages}
                            page={licenseKeyStore?.licenseKeyTablePage}
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

export default LicenseKeys;
