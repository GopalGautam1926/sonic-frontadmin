import React, { useEffect, useState } from "react";
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import FancyCard from '../../components/FancyCard/FancyCard'
import Table from '../../components/Table/Table'
import { useStore } from '../../stores'
import UploadVersion from './components/UploadVersion'
import { useHistory, useLocation } from "react-router-dom";
import { getRouteNames } from "../../routes/routes.data";
import ReleaseHttps from "../../services/https/resources/release.https";
import { Tooltip } from "@material-ui/core";
import { toast } from "react-toastify";
import Badge from '../../components/Badge/Badge';
import RSpace from "../../components/rcomponents/RSpace";
import httpUrl from "../../services/https/httpUrl";



export default function Release() {
  const [state, setState] = useState({
    isDeleting: false,
    deleteVersion: ''
  });
  const downloadUrl = httpUrl.API_URL;
  const history = useHistory();
  const { releaseStore } = useStore()
  const columns = [
    {
      label: "Version Code",
      name: "versionCode",
      options: {
        filter: false,
        customBodyRender: (
          value,
          { rowIndex, columnIndex, currentTableData },
          updateValue
        ) => {
          const rowData = releaseStore.getVersions.versions.find(
            (itm) => itm.versionCode == value
          );
          const versionItems = [];
          if (rowData.latest) {
            versionItems.push(<div>{value}<Badge color="success" size="small" style={{ cursor: "pointer", marginLeft: "10px" }} label={<Tooltip><div style={{ fontSize: 11 }}>Latest</div></Tooltip>} /></div>);
          } else {
            versionItems.push(<div>{value}</div>)
          }
          return (
            <RSpace>
              {versionItems.map((versionItem) => (
                <RSpace.Item>{versionItem}</RSpace.Item>
              ))}
            </RSpace>
          );
        },
      }
    },
    {
      label: "Release Note",
      name: "releaseNote",
    },
    {
      label: "Platform",
      name: "platform",
    },
    {
      label: "Actions",
      name: "_id",
      options: {
        filter: false,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          const rowData = ''
          return (
            <Table.TableRowAction
              enableDownload={true}
              downloadButtonProps={{
                onClick: () => onDownloadVersion(value)
              }}
              viewButtonProps={{
                onClick: () => {
                  const path = `${getRouteNames()["km_version"]
                    }/view/${value}`;
                  history.push({
                    pathname: path,
                    state: {
                      version: rowData
                    }
                  });
                },
              }}
              deletePopConfirmProps={{
                onClickYes: () => onDeleteVersion(value)
              }}
              deleteButtonProps={{
                loading: (state.isDeleting && value == state.deleteVersion),
              }}

            />
          );
        },
      },
    },
  ]

  const onDeleteVersion = (version) => {
    setState({ ...state, isDeleting: true, deleteVersion: version });
    ReleaseHttps
      .deleteVersion(version)
      .then(({ data }) => {
        toast.success("Deleted");
        setState({ ...state, isDeleting: false, deleteVersion: '' });
      })
      .catch((err) => {
        toast.error("Error while deleting");
        setState({ ...state, isDeleting: false, deleteVersion: '' });
      });
  };
  const onDownloadVersion = (version) => {
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    const versionDownloadUrl = `${downloadUrl}/app-version/download-file/${version}`
    tempLink.href = versionDownloadUrl;
    const filename = 'version-file'
    tempLink.setAttribute('download', filename);
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(versionDownloadUrl);
    }, 100);


  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader color="success">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>Releases</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  All releases
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <FancyCard.CardContent>
          <DataFetchingStateComponent
            loading={releaseStore.loading}
            error={releaseStore.error}
            onClickTryAgain={() => releaseStore.fetchVersions()}
          >
            <Table
              title={
                <Table.TableActions
                  openDialogWhenClickAdd={true}
                  refreshButtonProps={{
                    onClick: () => { releaseStore.fetchVersions() },

                  }}
                  componentInsideDialog={<UploadVersion />}
                />

              }
              data={releaseStore.getVersions.versions || []}
              columns={columns}
              options={{
                count: releaseStore.getVersions.totalVersions
              }}
            />
          </DataFetchingStateComponent>
        </FancyCard.CardContent>
      </FancyCard>
    </div>
  )
}
