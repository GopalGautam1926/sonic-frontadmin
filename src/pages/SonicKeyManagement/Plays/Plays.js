import React, { useState } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import DataFetchingStateComponent from "../../../components/common/DataFetchingStateComponent";
import FancyCard from "../../../components/FancyCard/FancyCard";
import Table from "../../../components/Table/Table";
import { useStore } from "../../../stores";
import FilterPlays from "./components/FilterPlays";
import { format } from "date-fns";
import moment from "moment";
import CustomPagination from "../../../components/common/CustomPagination";
import RSpace from "../../../components/rcomponents/RSpace";
import RPopconfirm from "../../../components/rcomponents/RPopconfirm/RPopconfirm";
import AppButton from "../../../components/AppButton/AppButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
import { getSKSIDFromDetectionOrigin } from "../../../utils/general.utils";

export default function Plays() {
  const { playsStore } = useStore();
  const [state, setState] = useState({
    deletigPlayId: "",
    isDeletingPlay: false,
  });

  React.useEffect(() => {
    playsStore.changePlayTablePage(1);
    playsStore.fetchPlays();
  }, [playsStore?.getDateRange?.startDate, playsStore?.getDateRange?.endDate]);

  const deletePlay = (playId) => {
    setState({ ...state, deletigPlayId: playId, isDeletingPlay: true });
    playsStore
      .deletePlay(playId)
      .then((data) => {
        setState({ ...state, deletigPlayId: "", isDeletingPlay: false });
        toast.success("Deleted");
      })
      .catch((err) => {
        setState({ ...state, deletigPlayId: "", isDeletingPlay: false });
        toast.error(err.message || "Error deleting play");
      });
  };

  const columns = [
    {
      label: "Track ID",
      name: "sonicKey",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const trackId = value?.track?._id || "---";
          return trackId;
        },
      },
    },
    {
      label: "AmazingTag",
      name: "sonicKey",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const sonickey = value?.sonicKey || "---";
          return sonickey;
        },
      },
    },
    {
      label: "Radio Station",
      name: "radioStation",
      options: {
        filter: false,
        customBodyRender: (radioStation) => {
          const radio = radioStation?.name || "---";
          return radio;
        },
      },
    },
    {
      label: "Date",
      name: "detectedAt",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const date = value ? format(new Date(value), "dd/MM/yyyy") : "---";
          return date;
        },
      },
    },
    {
      label: "Time",
      name: "detectedAt",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const time = value ? format(new Date(value), "HH:mm") : "---";
          return time;
        },
      },
    },
    {
      label: "Duration",
      name: "sonicKey",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const duration = value?.contentDuration
            ? moment.utc(value?.contentDuration * 1000).format("mm:ss")
            : "---";
          return duration;
        },
      },
    },
    {
      label: "Artist",
      name: "sonicKey",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const artist =
            value?.contentOwner?.length > 20
              ? value?.contentOwner?.slice(0, 20) + "..."
              : value?.contentOwner || "---";
          return (
            <Tooltip title={value?.contentOwner}>
              <div>{artist}</div>
            </Tooltip>
          );
        },
      },
    },
    {
      label: "Title",
      name: "sonicKey",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const title = value?.contentName || "---";
          return title;
        },
      },
    },
    {
      label: "Country",
      name: "radioStation",
      options: {
        filter: false,
        customBodyRender: (radioStation) => {
          const country = radioStation?.country || "---";
          return country;
        },
      },
    },
    {
      label: "SK/SID",
      name: "detectionOrigins",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return getSKSIDFromDetectionOrigin(value);
        },
      },
    },
    {
      label: "Actions",
      name: "_id",
      options: {
        filter: false,
        customBodyRender: (value, { columnIndex }, updateValue) => {
          return (
            <RSpace>
              <RSpace.Item>
                <RPopconfirm
                  anchorElement={
                    <AppButton
                      loading={
                        state.deletigPlayId && value == state.deletigPlayId
                      }
                      asIconButton={true}
                      color="danger"
                      size="small"
                    >
                      <DeleteIcon style={{ fontSize: 18 }} />
                    </AppButton>
                  }
                  message="Really want to delete this play?"
                  onClickYes={() => deletePlay(value)}
                />
              </RSpace.Item>
            </RSpace>
          );
        },
      },
    },
  ];

  const onPageChange = (page) => {
    playsStore.fetchPlays(page);
    playsStore?.changePlayTablePage(page);
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader>
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>Plays</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  List of all plays
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <FancyCard.CardContent style={{ zIndex: 0 }}>
          <DataFetchingStateComponent
            loading={playsStore.loading}
            error={playsStore.error}
            onClickTryAgain={() => playsStore.fetchPlays()}
          >
            <Table
              title={
                <Table.TableActions
                  filterOnly
                  openDialogFilter={true}
                  refreshButtonProps={{
                    onClick: () => playsStore.fetchPlays(),
                  }}
                  componentInsideDialogFilter={<FilterPlays />}
                  dateRange={true}
                  startDate={playsStore?.getDateRange?.startDate}
                  onChangeStartDate={(date) =>
                    playsStore?.changeDateRange({
                      ...playsStore?.getDateRange,
                      startDate: date,
                    })
                  }
                  endDate={playsStore?.getDateRange?.endDate}
                  onChangeEndDate={(date) =>
                    playsStore?.changeDateRange({
                      ...playsStore?.getDateRange,
                      endDate: date,
                    })
                  }
                />
              }
              data={playsStore?.getPlays?.docs || []}
              columns={columns}
              options={{
                count: playsStore?.getPlays?.totalDocs || 0,
                customFooter: () => {
                  return (
                    <CustomPagination
                      totalPages={playsStore?.getPlays?.totalPages}
                      page={playsStore?.getPlayTablePage}
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
