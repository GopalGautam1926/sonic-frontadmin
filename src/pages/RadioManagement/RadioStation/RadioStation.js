import React, { useEffect, useState } from "react";
import FancyCard from "../../../components/FancyCard/FancyCard";
import Table from "../../../components/Table/Table";
// import AddApiKey from "./components/AddApiKey";
import { useHistory, useLocation } from "react-router-dom";
import { getRouteNames } from "../../../routes/routes.data";
import { format } from "date-fns";
import { isExpired } from "../../../utils/general.utils";
import RSpace from "../../../components/rcomponents/RSpace";
import { log } from "../../../utils/app.debug";
import { useStore } from "../../../stores";
import DataFetchingStateComponent from "../../../components/common/DataFetchingStateComponent";
import radiostationHttps from "../../../services/https/resources/radiostation.https";
import { toast } from "react-toastify";
import Badge from '../../../components/Badge/Badge';
import AddRadioStation from "./components/AddRadioStation";

function RadioStation() {
  const [state, setState] = useState({
    isDeleting: false,
    deletigKey:'',
    isPlaying: false,
    playingKey:''
  });
  const history = useHistory();
  const { radioStationStore } = useStore();

  const columns = [
    // {
    //   label: "Logo",
    //   name: "logo",
    // },
    {
      label: "Name",
      name: "name",
    },
    {
      label: "Streaming URL",
      name: "streamingUrl",
      // options: {
      //   filter: false,
      //   customBodyRender: (value, { columnIndex }, updateValue) => {
      //     // const validity = value ? format(new Date(value), "dd/MM/yyyy") : "--";
      //     const urlShortText = value?.length > 20 ? value?.slice(0, 20) + "..." : value;
      //     return urlShortText;
      //   },
      // },
    },
    {
      label: "Website",
      name: "website",
      options: {
        filter: false,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          // const validity = value ? format(new Date(value), "dd/MM/yyyy") : "--";
          const urlShortText = value?.length > 20 ? value?.slice(0, 20) + "..." : value;
          return urlShortText;
        },
      },
    },
    {
      label: "Country",
      name: "country",
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
          const rowData = radioStationStore.getRadioStations.docs.find(
            (itm) => itm._id == value
          );
          const statusItem = [];
          if (rowData?.isStreamStarted === true) {
            statusItem.push(
              <Badge color="success" size="small" label={<div style={{fontSize:11}}>Listening</div>} />
            );
          } else if (rowData?.isStreamStarted === false && rowData?.error === null){
            statusItem.push(
              <Badge color="warning" size="small" label={<div style={{fontSize:11, marginLeft:0}}>Not Listening</div>} />
            );
          }
          else if(rowData?.isStreamStarted === false && rowData?.error !== null) {
            statusItem.push(
              <Badge color="rose" size="small" label={<div style={{fontSize:11}}>Error</div>} />
            );
          }
          // if (statusItem.length === 0) {
          //   statusItem.push(
          //     <Badge color="success" size="small" label="Active" />
          //   );
          // }

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
          const rowData = radioStationStore.getRadioStations.docs.find(
            (itm) => itm.key == value
          );
          return (
            <Table.RadioTableRowAction
            enableDelete={true}
              viewButtonProps={{
                onClick: () => {
                  const path = `${
                    getRouteNames()["radio_station"]
                  }/view/${value}`;
                  history.push({
                    pathname:path,
                    state:{
                      radioStation:rowData
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
    radiostationHttps
      .deleteRadioStation(key)
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
                <h4 className={headerClasses.cardTitleWhite}>Radio Stations</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  List of all radio stations
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <FancyCard.CardContent>
          <DataFetchingStateComponent
            loading={radioStationStore.loading}
            error={radioStationStore.error}
            onClickTryAgain={() => radioStationStore.fetchRadioStations()}
          >
            <Table
              title={
                <Table.TableActions
                  refreshButtonProps={{
                    onClick: () => radioStationStore.fetchRadioStations(),
                  }}
                  componentInsideDialog={<AddRadioStation />}
                />
              }
              data={radioStationStore.getRadioStations?.docs || []}
              columns={columns}
              options={{
                count:radioStationStore.getRadioStations.totalDocs
              }}
            />
          </DataFetchingStateComponent>
        </FancyCard.CardContent>
      </FancyCard>
    </div>
  );
}

export default RadioStation;
