import React from "react";
import RSpace from "../../rcomponents/RSpace/RSpace";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { IconButton } from "@material-ui/core";
import RPopconfirm from "../../rcomponents/RPopconfirm";
import AppButton from "../../AppButton/AppButton";

export default function RadioTableRowAction({
  viewButton,
  viewButtonProps,
  startButton,
  startButtonProps,
  playPopConfirmProps,
  stopButton,
  stopButtonProps,
  playButton,
  playButtonProps,
  deleteButton,
  enableDelete = true,
  enableStart = true,
  enableStop = true,
  enablePlay = true,
  deleteButtonProps,
  deletePopConfirmProps,
}) {
  return (
    <RSpace justifyContent="flex-start" spacing={0} >
      <RSpace.Item>
        <IconButton size="small" color="primary"  {...viewButtonProps}>
          {viewButton || <VisibilityOutlinedIcon style={{ fontSize: 18 }} />}
        </IconButton>
      </RSpace.Item>

      {enableStart && <RSpace.Item>
            <AppButton asIconButton={true} color="primary" size="small" {...startButtonProps}>
              {startButton || <PlayCircleFilledWhiteOutlinedIcon style={{ fontSize: 18 }} />}
            </AppButton>
      </RSpace.Item>}

      {enableStop && <RSpace.Item>
            <AppButton asIconButton={true} color="danger" size="small" {...stopButtonProps}>
              {stopButton || <PlayCircleFilledWhiteRoundedIcon style={{ fontSize: 18 }} />}
            </AppButton>
      </RSpace.Item>}

      {enablePlay && <RSpace.Item>
        <RPopconfirm
          anchorElement={
            <AppButton asIconButton={true} color="primary" size="small" {...playButtonProps}>
              {playButton || <PlayArrowIcon style={{ fontSize: 18 }} />}
            </AppButton>
          }
          message="Play radio?"
          {...playPopConfirmProps}
        />
      </RSpace.Item>}

      {enableDelete && <RSpace.Item>
        <RPopconfirm
          anchorElement={
            <AppButton asIconButton={true} color="danger" size="small" {...deleteButtonProps}>
              {deleteButton || <DeleteOutlinedIcon style={{ fontSize: 18 }} />}
            </AppButton>
          }
          message="Really want to delete this item?"
          {...deletePopConfirmProps}
        />
      </RSpace.Item>}
    </RSpace>
  );
}
