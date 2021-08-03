import React from "react";
import RSpace from "../../rcomponents/RSpace/RSpace";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { IconButton } from "@material-ui/core";
import RPopconfirm from "../../rcomponents/RPopconfirm";
import AppButton from "../../AppButton/AppButton";

export default function TableRowAction({
  viewButton,
  viewButtonProps,
  deleteButton,
  deleteButtonProps,
  deletePopConfirmProps,
}) {
  return (
    <RSpace>
      <RSpace.Item>
        <IconButton size="small" color="primary" {...viewButtonProps}>
          {viewButton || <VisibilityOutlinedIcon />}
        </IconButton>
      </RSpace.Item>

      <RSpace.Item>
        <RPopconfirm
          anchorElement={
            <AppButton asIconButton={true} color="danger" size="small" {...deleteButtonProps}>
              {deleteButton || <DeleteOutlinedIcon />}
            </AppButton>
          }
          message="Really want to delete this item?"
          {...deletePopConfirmProps}
        />
      </RSpace.Item>
    </RSpace>
  );
}
