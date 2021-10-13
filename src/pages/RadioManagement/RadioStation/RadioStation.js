import React, { useEffect, useState } from "react";
import FancyCard from "../../../components/FancyCard/FancyCard";
import Table from "../../../components/Table/Table";
// import AddApiKey from "./components/AddApiKey";
import { useHistory, useLocation } from "react-router-dom";
import { getRouteNames } from "../../../routes/routes.data";
import RSpace from "../../../components/rcomponents/RSpace";
import { log } from "../../../utils/app.debug";
import { useStore } from "../../../stores";
import DataFetchingStateComponent from "../../../components/common/DataFetchingStateComponent";
import radiostationHttps from "../../../services/https/resources/radiostation.https";
import { toast } from "react-toastify";
import Badge from '../../../components/Badge/Badge';
import AddRadioStation from "./components/AddRadioStation";
import { Box, CircularProgress, Dialog, DialogContent, Tooltip } from "@material-ui/core";
import Timer from "./components/Timer";

function RadioStation() {
  const [state, setState] = useState({
    isDeleting: false,
    deletigKey: '',
    isPlaying: false,
    playingKey: '',
    onStart: false,
    startId: '',
    onStop: false,
    stopId: ''
  });
  const [values, setValues] = React.useState({
    openPlayingModal: false,
  })
  const history = useHistory();
  const { radioStationStore } = useStore();
  const [stop, setStop] = useState(false);

  const columns = [
    {
      label: "Name",
      name: "name",
    },
    {
      label: "Logo",
      name: "_id",
      options: {
        filter: false,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          const rowData = radioStationStore.getRadioStations.docs.find(
            (itm) => itm._id == value
          );
          const favIconUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${rowData.website || rowData.streamingUrl}`;
          return <img src={favIconUrl} />;
        },
      },
    },
    {
      label: "Streaming URL",
      name: "streamingUrl",
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
      label: "Website",
      name: "website",
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
          if (rowData?.isStreamStarted === false && !rowData?.isError) {
            statusItem.push(
              <Badge color="warning" size="small" label={<div style={{ fontSize: 11 }}>Not Listening</div>} />
            );
          } if (rowData?.isStreamStarted === true) {
            statusItem.push(
              <Badge color="success" size="small" label={<div style={{ fontSize: 11, marginLeft: 0 }}>Listening</div>} />
            );
          }
          if (rowData?.isError === true && !rowData?.isStreamStarted) {
            const errorMessage = rowData.error.message;
            statusItem.push(

              <Badge color="rose" size="small" style={{ cursor: "pointer" }} label={<Tooltip title={errorMessage}><div style={{ fontSize: 11 }}>Error</div></Tooltip>} />
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
          const rowData = radioStationStore.getRadioStations.docs.find(
            (itm) => itm._id == value
          );
          return (
            <Table.RadioTableRowAction
              enableDelete={true}
              viewButtonProps={{
                onClick: () => {
                  const path = `${getRouteNames()["radio_station"]
                    }/view/${value}`;
                  history.push({
                    pathname: path,
                    state: {
                      radioStation: rowData
                    }
                  });
                },
              }}
              startButtonProps={{
                onClick: () => onStartRadio(value)
              }}
              stopButtonProps={{
                onClick: () => onStopRadio(value)
              }}
              playPopConfirmProps={{
                onClickYes: () => onPlayKey(value, rowData)
              }}
              playButtonProps={{
                loading: (state.isPlaying && value == state.playingKey),
              }}
            />

          );
        },
      },
    },
  ];

  const onStartRadio = (id) => {
    setState({ ...state, onStart: true, startId: id });
    radiostationHttps
      .startListeningRadioStation(id)
      .then(({ data }) => {
        toast.success("Radio Listening");
        setState({ ...state, onStart: false, startId: '' });
      })
      .catch((err) => {
        toast.error("Error while listening");
        setState({ ...state, onStart: false, startId: '' });
      });
  }

  const onStopRadio = (id) => {
    setState({ ...state, onStop: true, stopId: id });
    radiostationHttps
      .stopListeningRadioStation(id)
      .then(({ data }) => {
        toast.success("Radio Stopped");
        setState({ ...state, onStop: false, stopId: '' });
      })
      .catch((err) => {
        toast.error("Error while radio stopped");
        setState({ ...state, onStop: false, stopId: '' });
      });
  }

  const onPlayKey = (id, rowData) => {
    setValues({ ...values, openPlayingModal: true })
    const audio = new Audio(rowData.streamingUrl)
    audio?.play().then(() => {
      toast.success("Radio started...");
      setTimeout(() => {
        audio.pause();
        setValues({ ...values, openPlayingModal: false })
      }, 9000);
    }).catch(() => {
      toast.error("Error Occured...");
      setValues({ ...values, openPlayingModal: false })

    })
  }
  const closePlayingModal = () => {
    stop && setValues({ ...values, openPlayingModal: false })
  }


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
                  // searchButtonProps={{ 
                  //   onClick: () => radioStationStore.SearchByCountryAndStatus(searchButtonProps),
                  // }}
                  componentInsideDialog={<AddRadioStation />}
                />
              }
              data={radioStationStore.getRadioStations?.docs || []}
              columns={columns}
              options={{
                count: radioStationStore.getRadioStations.totalDocs
              }}
            />
          </DataFetchingStateComponent>
        </FancyCard.CardContent>
      </FancyCard>

      <Dialog
        open={values?.openPlayingModal}
        onClose={closePlayingModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={true}
      >
        <DialogContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="mb-2" >
          <div style={{ marginRight: "10px" }}>Radio playing for <Timer setStop={setStop} /> seconds...</div>
          <Box position="relative" display="inline-flex">
            <CircularProgress color="secondary" />
          </Box>
        </DialogContent>
      </Dialog>


    </div>
  );
}

export default RadioStation;
