import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
// core components
import useStyles from "./styles";
import { CountrySelect } from "./CountryDropDown";
import { Select } from "@material-ui/core";
import countries from "../../constants/countries";
import { toast } from 'react-toastify';

function AppPasswordInput({ inputProps, ...props }) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const classes = useStyles();
  return (
    <AppTextInput
      {...props}
      endIcon={
        passwordVisibility ? (
          <VisibilityOffIcon
            className={classes.visibilityIcon}
            onClick={() => setPasswordVisibility(false)}
          />
        ) : (
          <VisibilityIcon
            className={classes.visibilityIcon}
            onClick={() => setPasswordVisibility(true)}
          />
        )
      }
      inputProps={{
        ...inputProps,
        type: passwordVisibility ? "text" : "password",
      }}
    />
  );
}

function AppPhoneNumberInput({ inputProps,countrySelectProps,onChangePhoneNumber, ...props }) {
  const classes = useStyles();
  return (
    <AppTextInput
      {...props}
      endIcon={
        <Select
          disableUnderline
          native
          // value={countryCode}
          // onChange={(e) => setCountryCode(e.target.value)}
          inputProps={{
            name: "countrycode",
            id: "countrycode-native-simple",
          }}
          className={classes.countryselect}
          {...countrySelectProps}
        >
          {countries.map((country) => (
            <option value={country.phoneCode}>{`${country.alpha2code}(${country.phoneCode})`}</option>
          ))}
        </Select>
      }
      inputProps={{
        ...inputProps
      }}
    />
  );
}

export default function AppTextInput({
  formControlProps,
  labelText,
  id,
  helperText,
  labelProps,
  inputProps,
  error,
  endIcon,
  success,
}) {
  const classes = useStyles();

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });
  let newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined,
    step: inputProps && inputProps.step ? inputProps.step : undefined,
  };
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps?.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
        inputProps={newInputProps}
        variant="outlined"
      />
      <FormHelperText id="component-error-text">{helperText}</FormHelperText>
      {endIcon}
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}
AppTextInput.AppPasswordInput = AppPasswordInput;
AppTextInput.AppPhoneNumberInput = AppPhoneNumberInput;

AppTextInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  rtlActive: PropTypes.bool,
};
