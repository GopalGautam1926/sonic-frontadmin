import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import AppTextInput from "../AppTextInput/AppTextInput";
import Chip from "@material-ui/core/Chip";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AppButton from "../AppButton/AppButton";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";

var formatForObjectProperty = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
export function KeyValueRowItem({
  keyText,
  valueText,
  onChangeKey,
  onChangeValue,
  onDelete,
  index,
  disabled,
  ...props
}) {
  return (
    <div>
      <Chip
        style={{ height: "auto", background: "transparent", marginTop: 5 }}
        onDelete={onDelete}
        disabled={disabled}
        deleteIcon={<RemoveCircleOutlineIcon color="primary" />}
        label={
          <Grid container spacing={2}>
            <Grid item>
              <AppTextInput
                id={`key-${index}`}
                labelText="Key"
                inputProps={{
                  value: keyText,
                  onChange: onChangeKey,
                }}
              />
            </Grid>
            <Grid item>
              <AppTextInput
                id={`value-${index}`}
                labelText="Value"
                inputProps={{
                  value: valueText,
                  onChange: onChangeValue,
                  multiline: true,
                }}
              />
            </Grid>
          </Grid>
        }
        {...props}
      />
    </div>
  );
}
export default function KeyValue({ data = {}, disabled, onChangeData, addButtonProps, containerStyle }) {
  return (
    <div>
      <Grid container spacing={1} style={{ ...containerStyle }}>
        <Grid item>
          <AppButton
            asIconButton={true}
            variant="container"
            color="success"
            size="small"
            onClick={() => {
              const modifiedData = { ...data, "": "" };
              onChangeData(modifiedData);
            }}
            disabled={disabled}
            {...addButtonProps}
          >
            <AddIcon style={{ fontSize: 20 }} />
          </AppButton>
        </Grid>
      </Grid>
      {Object.entries(data).map(([key, value], index) => {
        return (
          <KeyValueRowItem
            keyText={key}
            valueText={value}
            onChangeKey={(e) => {
              const oldData = { ...data };
              const newKey = e.target.value;

              if (formatForObjectProperty.test(newKey)) {
                toast.error("can not contain special characters on key");
                return;
              }

              if (oldData[newKey]) {
                toast.error("key already present");
                return;
              }
              const oldDataIntoArrayEntries = Object.entries(oldData);
              oldDataIntoArrayEntries[index][0] = newKey;
              const modifiedData = Object.fromEntries(oldDataIntoArrayEntries);
              onChangeData(modifiedData);
            }}
            onChangeValue={(e) => {
              const oldData = { ...data };
              oldData[key] = e.target.value;
              onChangeData(oldData);
            }}
            onDelete={() => {
              const oldData = { ...data };
              delete oldData[key];
              onChangeData(oldData);
            }}
            index={index}
            key={index}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
}
