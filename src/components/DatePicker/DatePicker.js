import React, { forwardRef } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { InputAdornment } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AppTextInput from "../AppTextInput/AppTextInput";

export default function DatePicker({
  inputProps,
  label,
  selected,
  onChange,
  ...props
}) {
  const ExampleCustomInput = forwardRef(
    ({ value, label, onClick, ...rest }, ref) => (
      <AppTextInput
        labelText={label}
        id={label}
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          value: value,
          onClick: onClick,
          inputRef: ref,
          startAdornment: (
            <InputAdornment position="start">
              <AccessTimeIcon color="primary" />
            </InputAdornment>
          ),
          ...rest,
        }}
      />
    )
  );
  return (
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
      {...props}
      customInput={<ExampleCustomInput label={label} {...inputProps} />}
    />
  );
}
