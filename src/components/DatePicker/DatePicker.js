import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { InputAdornment, makeStyles, useTheme } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AppTextInput from "../AppTextInput/AppTextInput";

export default function DatePicker({
  inputProps,
  label,
  selected,
  onChange,
  ...props
}) {
  //  
  const classes = useStyles();
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
    calendarClassName={classes.calendarClassName}
      selected={selected}
      onChange={onChange}
      {...props}
      customInput={<ExampleCustomInput label={label} {...inputProps} />}
    />
  );
}
const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    calendarClassName: {
      backgroundColor: `${theme.palette.background.dark4} !important`,
      color: `${theme.palette.background.contrastText} !important`,
      fontFamily: theme.fontFamily.regular,
      "& .react-datepicker__day": {
        color: theme.palette.primary.contrastText,
        "&:hover": {
          color: theme.palette.background.dark1,
        },
      },
      "& .react-datepicker__day--today": {
        backgroundColor: `${theme.palette.background.dark1} !important`,
        outline: `2px solid ${theme.palette.primary.main} !important`,
      },
    },
  };
});

