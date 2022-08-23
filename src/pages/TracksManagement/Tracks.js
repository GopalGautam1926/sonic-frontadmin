import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import FancyCard from '../../components/FancyCard/FancyCard'
import Table from '../../components/Table/Table'
import { useStore } from '../../stores'
import moment from 'moment'
import CustomPagination from '../../components/common/CustomPagination'
import TrackActions from './Components/TrackActions'
import FilterTracks from './Components/FilterTracks'
import DatePicker from '../../components/DatePicker/DatePicker'
import { Grid, Tooltip } from '@material-ui/core'

export default function Tracks() {
  const { tracksStore } = useStore()

  React.useEffect(() => {
    tracksStore.fetchTracks()
  }, [tracksStore?.dateRange?.startDate, tracksStore?.dateRange?.endDate])

  const columns = [
    {
      label: "Track ID",
      name: "_id"
    },
    {
      label: "Artist",
      name: "trackMetaData",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const artist = value?.contentOwner || "---";
          return artist;
        },
      },
    },
    {
      label: "Title",
      name: "trackMetaData",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const title = value?.contentName || "---";
          return title;
        },
      },
    },
    {
      label: "Version",
      name: "trackMetaData",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const version = value?.version || "---";
          return version;
        },
      },
    },
    {
      label: "Distributor",
      name: "trackMetaData",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const distributor = value?.distributor || "---";
          return distributor;
        },
      },
    },
    {
      label: "FileType",
      name: "trackMetaData",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const type = value?.contentFileType || "---";
          return type;
        },
      },
    },
    {
      label: "EncodedDate",
      name: "createdAt",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
    },
    {
      label: "System/Partner ID",
      name: "_id",
      options: {
        display: false,
        filter: false,
        customBodyRender: (value) => {
          const rowData = tracksStore?.tracks?.docs.find(
            (itm) => itm._id == value
          );
          if (rowData?.partner?._id) {
            return rowData?.partner?._id
          } else if (rowData?.company?._id) {
            return rowData?.company?._id
          }
          else if (rowData?.owner?._id) {
            return rowData?.owner?._id
          }
          else {
            return "---"
          }
        },
      },
    },
    {
      label: "Description",
      name: "trackMetaData",
      options: {
        display: false,
        filter: false,
        customBodyRender: (value) => {
          const desc = value?.contentDescription?.length > 20
            ? value?.contentDescription?.slice(0, 20) + "..."
            : value?.contentDescription || "---" || "---";
          return (
            <Tooltip title={value?.contentDescription}>
              <div>{desc}</div>
            </Tooltip>
          );
        },
      },
    },
    {
      label: "Actions",
      name: "_id",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const rowData = tracksStore?.tracks?.docs?.find(item => item?._id === value)
          return (
            <TrackActions trackData={rowData} />
          );
        },
      },
    }
  ]

  const onPageChange = (page) => {
    tracksStore.fetchTracks(page)
  }

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader color="purple">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>Tracks</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  List of all tracks
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <FancyCard.CardContent style={{ zIndex: 0 }}>
          <DataFetchingStateComponent
            loading={tracksStore?.loading}
            error={tracksStore.error}
            onClickTryAgain={() => { }}
          >
            <Table
              title={
                <Table.TableActions
                  filterOnly
                  openDialogFilter={true}
                  refreshButtonProps={{
                    onClick: () => tracksStore.fetchTracks(),
                  }}
                  componentInsideDialogFilter={<FilterTracks />}
                  dateRange={true}
                  startDate={tracksStore?.dateRange?.startDate}
                  onChangeStartDate={(date) => tracksStore?.changeDateRange({ ...tracksStore?.dateRange, startDate: date })}
                  endDate={tracksStore?.dateRange?.endDate}
                  onChangeEndDate={(date) => tracksStore?.changeDateRange({ ...tracksStore?.dateRange, endDate: date })}

                />
              }
              columns={columns}
              data={tracksStore?.tracks?.docs || []}
              options={{
                count: tracksStore?.tracks?.docs?.length,
                customFooter: (
                ) => {
                  return (
                    <CustomPagination
                      totalPages={tracksStore?.tracks?.totalPages}
                      page={tracksStore?.tracks?.page}
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
  )
}
