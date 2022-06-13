import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent'
import FancyCard from '../../components/FancyCard/FancyCard'
import Table from '../../components/Table/Table'
import { useStore } from '../../stores'
import { log } from '../../utils/app.debug'
import moment from 'moment'
import CustomPagination from '../../components/common/CustomPagination'
import { Grid } from '@material-ui/core'
import AppButton from '../../components/AppButton/AppButton'

export default function Tracks() {
  const {tracksStore} = useStore()
  React.useEffect(() => {
    tracksStore.fetchTracks()
  },[])

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
    name: "company" || "owner" || "partner",
    options: {
      filter: false,
      customBodyRender: (value) => {
        return value?._id;
      },
    },
  },
  {
    label:"ACTIONS",
    name:"_id",
    options: {
      filter: false,
      customBodyRender: (Value) => {
        return (
          <div>
            <AppButton asIconButton={true}>...</AppButton>
          </div>
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
                    <FancyCard.CardHeader color="success">
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
                        onClickTryAgain={() => {}}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    addPlusFilter
                                    openDialogWhenClickAdd={true}
                                    openDialogFilter={true}
                                    refreshButtonProps={{
                                        onClick: () => tracksStore.fetchTracks(),
                                    }}
                                    componentInsideDialog={<div>Hello</div>}
                                    componentInsideDialogFilter={<div>Hello</div>}
                                />
                            }
                            columns={columns}
                            data={ tracksStore?.tracks?.docs || []}
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
