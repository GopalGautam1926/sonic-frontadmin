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
import { Grid } from '@material-ui/core'

export default function Tracks() {
  const { tracksStore } = useStore()

  React.useEffect(() => {
    tracksStore.fetchTracks()
  }, [tracksStore?.dateRange?.startDate, tracksStore?.dateRange?.endDate])

  const columns = [
    {
      label: "TRACK ID",
      name: "_id"
    },
    {
      label: "TITLE",
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
      label: "VERSION",
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
      label: "ARTIST",
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
      label: "DISTRIBUTOR",
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
      label: "FILE TYPE",
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
      label: "ENCODED DATE",
      name: "createdAt",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
    },
    {
      label: "SYSTEM/PARTNER ID",
      name: "_id",
      options: {
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
      label: "ACTIONS",
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
          <FancyCard.CardHeader >
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
        <Grid container style={{ padding: "0px 20px", display: 'flex', justifyContent: 'flex-end', zIndex: 1 }}>
          <Grid item>
            <DatePicker
              label="Start Date"
              selected={tracksStore?.dateRange?.startDate}
              onChange={(date) => tracksStore?.changeDateRange({ ...tracksStore?.dateRange, startDate: date })}
              showYearDropdown
              dateFormat="dd/MM/yyyy"
              yearDropdownItemNumber={15}
              scrollableYearDropdown
              showMonthDropdown
              startDate={tracksStore?.dateRange?.startDate}
              endDate={tracksStore?.dateRange?.endDate}
            />
          </Grid>
          <Grid item className="mt-4 mx-3">
            <p style={{ fontSize: '14px' }}>TO</p>
          </Grid>

          <Grid item>
            <DatePicker
              label="End Date"
              selected={tracksStore?.dateRange?.endDate}
              onChange={(date) => tracksStore?.changeDateRange({ ...tracksStore?.dateRange, endDate: date })}
              showYearDropdown
              dateFormat="dd/MM/yyyy"
              yearDropdownItemNumber={15}
              scrollableYearDropdown
              showMonthDropdown
              startDate={tracksStore?.dateRange?.startDate}
              endDate={tracksStore?.dateRange?.endDate}
            />
          </Grid>
        </Grid>

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
