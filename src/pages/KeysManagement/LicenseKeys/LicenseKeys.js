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
function LicenseKeys() {
  const [state, setState] = useState({
    isDeleting: false,
    deletigKey:''
  });
  const history = useHistory();
  const { licenseKeyStore } = useStore();
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
      label: "Max Uses (encode)",
      name: "maxEncodeUses",
    },
    {
      label: "Uses (encode)",
      name: "encodeUses",
    },
    {
      label: "Max Uses (decode)",
      name: "maxDecodeUses",
      options:{
        display:false
      }
    },
    {
      label: "Uses (decode)",
      name: "decodeUses",
      options:{
        display:false
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
              <Badge color="rose" size="small" label={<div style={{fontSize:11}}>Disabled</div>} />
            );
          }
          if (rowData?.suspended) {
            statusItem.push(
              <Badge color="warning" size="small" label={<div style={{fontSize:11}}>Suspended</div>} />
            );
          }
          if (isExpired(rowData?.validity)) {
            statusItem.push(
              <Badge color="danger" size="small" label={<div style={{fontSize:11}}>Expired</div>} />
            );
          }
          if (statusItem.length == 0) {
            statusItem.push(
              <Badge color="success" size="small" label={<div style={{fontSize:11}}>Active</div>} />
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
              viewButtonProps={{
                onClick: () => {
                  const path = `${
                    getRouteNames()["km_licensekeys"]
                  }/view/${value}`;
                  history.push({
                    pathname:path,
                    state:{
                      license:rowData
                    }
                  });
                },
              }}
              deletePopConfirmProps={{
                onClickYes: () =>onDeleteKey(value)
              }}
              deleteButtonProps={{
                loading: (state.isDeleting && value==state.deletigKey),
              }}
            />
          );
        },
      },
    },
  ];

  const onDeleteKey = (key) => {
    setState({ ...state, isDeleting: true,deletigKey:key });
    licensekeysHttps
      .deleteLicense(key)
      .then(({ data }) => {
        toast.success("Deleted");
        setState({ ...state, isDeleting: false,deletigKey:'' });
      })
      .catch((err) => {
        toast.error("Error while deteting");
        setState({ ...state, isDeleting: false,deletigKey:'' });
      });
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader color="purple">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>License Keys</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  List of all license keys
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
                  refreshButtonProps={{
                    onClick: () => licenseKeyStore.fetchLicenseKeys(),
                  }}
                  componentInsideDialog={<AddLicenseKeys />}
                />
              }
              data={licenseKeyStore.getLicenseKeys?.docs || []}
              columns={columns}
              options={{
                count:licenseKeyStore.getLicenseKeys.totalDocs
              }}
            />
          </DataFetchingStateComponent>
        </FancyCard.CardContent>
      </FancyCard>
    </div>
  );
}

export default LicenseKeys;
