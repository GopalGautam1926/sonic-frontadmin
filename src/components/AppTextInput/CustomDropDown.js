import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import { Select } from "@material-ui/core";
import useStyles from './styles.js';

export default function CustomDropDown({
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    data,
}) {
    const classes = useStyles();

    return (
        <FormControl style={{}}
            {...formControlProps}
        >
            {labelText !== undefined ? (
                <InputLabel
                    htmlFor={id}
                    {...labelProps}
                >
                    {labelText}
                </InputLabel>
            ) : null}
            <Select
                style={{ boxShadow: "none" } }
                id={id}
                className={classes.customDropDownDisabled}
                {...inputProps}
            >
                {data?.map((data, index) => (
                    <option style={{ cursor: "pointer" }} key={index} value={data}>{data}</option>
                ))}
            </Select>
            {error ? (
                <Clear />
            ) : success ? (
                <Check />
            ) : null}
        </FormControl>
    );
}

CustomDropDown.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    rtlActive: PropTypes.bool,
    data: PropTypes.array
};

