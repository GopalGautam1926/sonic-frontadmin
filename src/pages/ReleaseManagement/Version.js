import React, { useEffect, useState } from "react";
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import FancyCard from '../../components/FancyCard/FancyCard'
import Table from '../../components/Table/Table'
import { useStore } from '../../stores'
import UploadVersion from './components/UploadVersion'
import FilterPlatform from './components/FilterPlatForm'
import { useHistory, useLocation } from "react-router-dom";
import { getRouteNames } from "../../routes/routes.data";
import ReleaseHttps from "../../services/https/resources/release.https";
import { Tooltip } from "@material-ui/core";
import { toast } from "react-toastify";
import Badge from '../../components/Badge/Badge';
import RSpace from "../../components/rcomponents/RSpace";
import httpUrl from "../../services/https/httpUrl";
import { format } from "date-fns";



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
          const rowData = releaseStore.getVersions.find(
            (itm) => itm.versionCode == value
          );
          const versionItems = [];
          if (rowData.latest) {
            versionItems.push(<div><span>v</span>{value}<Badge color="success" size="small" style={{ cursor: "pointer", marginLeft: "10px" }} label={<Tooltip><div style={{ fontSize: 11 }}>Latest</div></Tooltip>} /></div>);
          } else {
            versionItems.push(<div><span>v</span>{value}</div>)
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
      options: {
        filter: false,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          return <Tooltip title={value}><div style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: 100,
            wordWrap: "none",
            cursor: "pointer",
            overflow: "hidden",
          }
          }>{value}</div></Tooltip>;
        },
      },
    },
    {
      label: "Release Date",
      name: "createdAt",
      options: {
        filter: false,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          const validity = value ? format(new Date(value), "dd/MM/yyyy") : "--";
          return validity;
        },
      },
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
              downloadPopConfirmProps={{
                onClickDownload: () => onDownloadVersion(value),
                onClickCopyLink: () => onCopyLink(value)
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
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(versionDownloadUrl);
    }, 10);
  };
  const onCopyLink = (version) => {
    const copyLinkContent = `${downloadUrl}/app-version/download-file/${version}`
    const cb = navigator.clipboard;
    cb.writeText(copyLinkContent).then(() => toast.success("Copied Successfully"));
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
                  addPlusFilter
                  openDialogWhenClickAdd={true}
                  openDialogFilter={true}
                  refreshButtonProps={{
                    onClick: () => { releaseStore.fetchVersions() },

                  }}
                  componentInsideDialog={<UploadVersion />}
                  componentInsideDialogFilter={<FilterPlatform />}
                />

              }
              data={releaseStore.getVersions || []}
              columns={columns}
              options={{
                count: releaseStore.getVersions?.length
              }}
            />
          </DataFetchingStateComponent>
        </FancyCard.CardContent>
      </FancyCard>
    </div>
  )
}
