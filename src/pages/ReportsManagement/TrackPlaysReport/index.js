import React from "react";
import moment from "moment";
import { Tooltip } from "@material-ui/core";

import { useStore } from "../../../stores";
import FancyCard from "../../../components/FancyCard/FancyCard";
import DataFetchingStateComponent from "../../../components/common/DataFetchingStateComponent";
import Table from "../../../components/Table/Table";
import CustomPagination from "../../../components/common/CustomPagination";
import DetectionFilter from "../components/DetectionFilter";
import { getSKSIDFromDetectionOrigin } from "../../../utils/general.utils";

export default function TrackPlaysReport() {
  const { reportsdetection } = useStore();

  React.useEffect(() => {
    reportsdetection.changeDetectionTablePage(1);
    reportsdetection.fetchReportsDetection();
  }, [// eslint-disable-line react-hooks/exhaustive-deps
    reportsdetection?.getDateRange?.startDate,
    reportsdetection?.getDateRange?.endDate,
  ]);

  const stableTableData = () => {
    const data = reportsdetection?.getDetectionReports?.docs?.map((data) => {
      return {
        companyName: data?.sonicKey?.company?.name,
        companyType: data?.sonicKey?.company?.companyType,
        contentOwner: data?.sonicKey?.contentOwner,
        contentName: data?.sonicKey?.contentName,
        radioStation: data?.radioStation?.name,
        date: data?.detectedAt,
        time: data?.detectedAt,
        duration: data?.sonicKey?.contentDuration,
        country: data?.radioStation?.country,
        trackId: data?.sonicKey?.track?._id,
        sonicKey: data?.sonicKey?.sonicKey,
        detectionOrigins: data?.detectionOrigins,
        version: data?.sonicKey?.version,
        distributor: data?.sonicKey?.distributor,
        label: data?.sonicKey?.label,
        isrcCode: data?.sonicKey?.isrcCode,
        iswcCode: data?.sonicKey?.iswcCode,
        tuneCode: data?.sonicKey?.tuneCode,
        contentDescription: data?.sonicKey?.contentDescription,
        contentFileType: data?.sonicKey?.contentFileType,
      };
    });
    return data;
  };

  const columns = [
    {
      label: "Company",
      name: "companyName",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "CompanyType",
      name: "companyType",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "Artist",
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
    {
      label: "Title",
      name: "contentName",
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
      label: "RadioStation",
      name: "radioStation",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "Date",
      name: "date",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value ? moment(value).utc().format("DD/MM/YYYY") : "---";
        },
      },
    },
    {
      label: "Time",
      name: "time",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value ? moment(value).utc().format("HH:mm") : "---";
        },
      },
    },
    {
      label: "Duration",
      name: "duration",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value ? moment.utc(value * 1000).format("mm:ss") : "---";
        },
      },
    },
    {
      label: "Country",
      name: "country",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "TrackId",
      name: "trackId",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "SonicKey",
      name: "sonicKey",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
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
      label: "Version",
      name: "version",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "Distributor",
      name: "distributor",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "Label",
      name: "label",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "ISRC",
      name: "isrcCode",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "ISWC",
      name: "iswcCode",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "TuneCode",
      name: "tuneCode",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "Description",
      name: "contentDescription",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
    {
      label: "FileType",
      name: "contentFileType",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value || "---";
        },
      },
    },
  ];

  const onPageChange = (page) => {
    reportsdetection?.fetchReportsDetection(page);
    reportsdetection?.changeDetectionTablePage(page);
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader>
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>
                  Track Plays Report
                </h4>
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
            loading={reportsdetection.loading}
            error={reportsdetection.error}
            onClickTryAgain={() =>
              reportsdetection.fetchReportsDetection(
                reportsdetection?.getDetectionReports?.page,
                "RADIOSTATIONS"
              )
            }
          >
            <Table
              title={
                <Table.TableActions
                  exportData={true}
                  handleExport={(data) =>
                    reportsdetection.exportReportsDetectionData(data)
                  }
                  filterOnly
                  openDialogFilter={true}
                  refreshButtonProps={{
                    onClick: () =>
                      reportsdetection.fetchReportsDetection(
                        reportsdetection?.getDetectionReports?.page,
                        "RADIOSTATIONS"
                      ),
                  }}
                  componentInsideDialogFilter={
                    <DetectionFilter title={"Track Plays"} />
                  }
                  dateRange={true}
                  startDate={reportsdetection?.getDateRange?.startDate}
                  onChangeStartDate={(date) =>
                    reportsdetection?.changeDateRange({
                      ...reportsdetection?.getDateRange,
                      startDate: date,
                    })
                  }
                  endDate={reportsdetection?.getDateRange?.endDate}
                  onChangeEndDate={(date) =>
                    reportsdetection?.changeDateRange({
                      ...reportsdetection?.getDateRange,
                      endDate: date,
                    })
                  }
                />
              }
              data={stableTableData() || []}
              columns={columns}
              options={{
                count: reportsdetection?.getDetectionReports?.totalDocs || 0,
                customFooter: () => {
                  return (
                    <CustomPagination
                      totalPages={
                        reportsdetection?.getDetectionReports?.totalPages
                      }
                      page={reportsdetection?.getDetectionTablePage}
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
