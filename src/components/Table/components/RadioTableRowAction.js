import React from "react";
import RSpace from "../../rcomponents/RSpace/RSpace";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import StopIcon from '@material-ui/icons/Stop';
import { IconButton, Tooltip } from "@material-ui/core";
import RPopconfirm from "../../rcomponents/RPopconfirm";
import AppButton from "../../AppButton/AppButton";
import VolumeDownIcon from '@material-ui/icons/VolumeDown';

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
  enableStart = true,
  enableStop = true,
  enablePlay = true,
}) {
  return (
    <RSpace justifyContent="flex-start" spacing={0} >
      <RSpace.Item>
        <Tooltip title={"view"}>
          <IconButton size="small" color="primary"  {...viewButtonProps}>
            {viewButton || <VisibilityOutlinedIcon style={{ fontSize: 18 }} />}
          </IconButton>
        </Tooltip>
      </RSpace.Item>

      {enablePlay && <RSpace.Item>
        <RPopconfirm
          anchorElement={
            <Tooltip title={"play"}>
              <AppButton asIconButton={true} color="primary" size="small" {...playButtonProps}>
                {playButton || <VolumeDownIcon style={{ fontSize: 18 }} />}
              </AppButton>
            </Tooltip>
          }
          message="Play radio?"
          {...playPopConfirmProps}
        />
      </RSpace.Item>}

      {enableStart && <RSpace.Item>
        <Tooltip title={"start"}>
          <AppButton asIconButton={true} color="primary" size="small" {...startButtonProps}>
            {startButton || <PlayCircleFilledWhiteOutlinedIcon style={{ fontSize: 18 }} />}
          </AppButton>
        </Tooltip>
      </RSpace.Item>}

      {enableStop && <RSpace.Item>
        <Tooltip title={"stop"}>
          <AppButton asIconButton={true} color="danger" size="small" {...stopButtonProps}>
            {stopButton || <StopIcon style={{ fontSize: 18 }} />}
          </AppButton>
        </Tooltip>
      </RSpace.Item>}
    </RSpace>
  );
}
