import React from "react";
import RSpace from "../../rcomponents/RSpace/RSpace";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { IconButton } from "@material-ui/core";
import RPopconfirm from "../../rcomponents/RPopconfirm";
import RDownloadConfirm from "../../rcomponents/RDownloadconfirm";
import AppButton from "../../AppButton/AppButton";

export default function TableRowAction({
  viewButton,
  downloadButton,
  downloadButtonProps,
  enableDownload = false,
  viewButtonProps,
  deleteButton,
  enableDelete = true,
  deleteButtonProps,
  deletePopConfirmProps,
  downloadPopConfirmProps,
}) {
  return (
    <RSpace justifyContent="flex-start" spacing={0}>
      <RSpace.Item>
        <IconButton color="secondary" size="small" {...viewButtonProps}>
          {viewButton || <VisibilityOutlinedIcon style={{ fontSize: 18 }} />}
        </IconButton>
      </RSpace.Item>
      {enableDownload && (
        <RSpace.Item>
          <RDownloadConfirm
            anchorElement={
              <AppButton
                asIconButton={true}
                size="small"
                color="secondary"
                {...downloadButtonProps}
              >
                {downloadButton || (
                  <ArrowDownwardIcon style={{ fontSize: 18 }} />
                )}
              </AppButton>
            }
            message="Please select your option"
            {...downloadPopConfirmProps}
          />
        </RSpace.Item>
      )}

      {enableDelete && (
        <RSpace.Item>
          <RPopconfirm
            anchorElement={
              <AppButton
                asIconButton={true}
                color="danger"
                size="small"
                {...deleteButtonProps}
              >
                {deleteButton || (
                  <DeleteOutlinedIcon style={{ fontSize: 18 }} />
                )}
              </AppButton>
            }
            message="Really want to delete this item?"
            {...deletePopConfirmProps}
          />
        </RSpace.Item>
      )}
    </RSpace>
  );
}
