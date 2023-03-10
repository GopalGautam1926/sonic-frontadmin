import React from "react";
import {Tooltip } from "@material-ui/core";
import DataFetchingStateComponent from "../../../components/common/DataFetchingStateComponent";
import FancyCard from "../../../components/FancyCard/FancyCard";
import Table from "../../../components/Table/Table";
import { useStore } from "../../../stores";
import { format } from "date-fns";
import moment from "moment";
import CustomPagination from "../../../components/common/CustomPagination";
import FilterEncoded from "./components/FilterEncoded";

export default function Encoded() {
  const { sonickeyStore } = useStore();

  React.useEffect(() => {
    sonickeyStore.changeSonicKeyTablePage(1);
    sonickeyStore.fetchSonicKeys();
  }, [// eslint-disable-line react-hooks/exhaustive-deps
    sonickeyStore?.getDateRange?.startDate,
    sonickeyStore?.getDateRange?.endDate,
  ]);

  const columns = [
    {
      label: "AMAZINGTAG",
      name: "sonicKey",
      options: {
        filter: false,
      },
    },
    {
      label: "DATE",
      name: "createdAt",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const date = format(new Date(value), "dd/MM/yyyy") || "---";
          return date;
        },
      },
    },
    {
      label: "TIME",
      name: "createdAt",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const time = format(new Date(value), "HH:mm") || "---";
          return time;
        },
      },
    },
    {
      label: "DURATION",
      name: "contentDuration",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const duration = moment.utc(value * 1000).format("mm:ss") || "---";
          return duration;
        },
      },
    },
    {
      label: "ORIGINAL FILENAME",
      name: "originalFileName",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const filename =
            value?.length > 20 ? value?.slice(0, 20) + "..." : value || "---";
          return (
            <Tooltip title={value}>
              <div>{filename}</div>
            </Tooltip>
          );
        },
      },
    },
    {
      label: "ARTIST",
      name: "contentOwner",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const artist =
            value?.length > 20 ? value?.slice(0, 20) + "..." : value || "---";
          return (
            <Tooltip title={value}>
              <div>{artist}</div>
            </Tooltip>
          );
        },
      },
    },
  ];

  const onPageChange = (page) => {
    sonickeyStore.fetchSonicKeys(page);
    sonickeyStore?.changeSonicKeyTablePage(page);
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader>
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>Encodes</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  List of all encoded AmazingTags
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <FancyCard.CardContent style={{ zIndex: 0 }}>
          <DataFetchingStateComponent
            loading={sonickeyStore.loading}
            error={sonickeyStore.error}
            onClickTryAgain={() => sonickeyStore.fetchSonicKeys()}
          >
            <Table
              title={
                <Table.TableActions
                  filterOnly
                  openDialogFilter={true}
                  refreshButtonProps={{
                    onClick: () => sonickeyStore.fetchSonicKeys(),
                  }}
                  componentInsideDialogFilter={<FilterEncoded />}
                  dateRange={true}
                  startDate={sonickeyStore?.getDateRange?.startDate}
                  onChangeStartDate={(date) =>
                    sonickeyStore?.changeDateRange({
                      ...sonickeyStore?.getDateRange,
                      startDate: date,
                    })
                  }
                  endDate={sonickeyStore?.getDateRange?.endDate}
                  onChangeEndDate={(date) =>
                    sonickeyStore?.changeDateRange({
                      ...sonickeyStore?.getDateRange,
                      endDate: date,
                    })
                  }
                />
              }
              data={sonickeyStore?.getSonicKeys?.docs || []}
              columns={columns}
              options={{
                count: sonickeyStore?.getSonicKeys?.totalDocs || 0,
                customFooter: () => {
                  return (
                    <CustomPagination
                      totalPages={sonickeyStore?.getSonicKeys?.totalPages}
                      page={sonickeyStore?.getSonicKeyTablePage}
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
