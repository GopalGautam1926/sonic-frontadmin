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
  enableDelete=true,
  deleteButtonProps,
  deletePopConfirmProps,
}) {
  return (
    <RSpace  justifyContent="flex-start" spacing={0} >
      <RSpace.Item>
        <IconButton size="small" color="primary"  {...viewButtonProps}>
          {viewButton || <VisibilityOutlinedIcon style={{fontSize:18}}/>}
        </IconButton>
      </RSpace.Item>

     {enableDelete && <RSpace.Item>
        <RPopconfirm
          anchorElement={
            <AppButton asIconButton={true} color="danger" size="small" {...deleteButtonProps}>
              {deleteButton || <DeleteOutlinedIcon style={{fontSize:18}}/>}
            </AppButton>
          }
          message="Really want to delete this item?"
          {...deletePopConfirmProps}
        />
      </RSpace.Item>}
    </RSpace>
  );
}