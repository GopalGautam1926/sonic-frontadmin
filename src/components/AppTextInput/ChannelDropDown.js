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

export default function ChannelDropDown({
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
}) {
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
            <Select style={{ boxShadow: "none" }}
                id={id}
                {...inputProps}
            >
                <option style={{ cursor: "pointer" }} value="ALL">ALL</option>
                <option style={{ cursor: "pointer" }} value="STREAMREADER">STREAMREADER</option>
                <option style={{ cursor: "pointer" }} value="PORTAL">PORTAL</option>
                <option style={{ cursor: "pointer" }} value="MOBILE">MOBILE</option>
            </Select>
            {error ? (
                <Clear />
            ) : success ? (
                <Check />
            ) : null}
        </FormControl>
    );
}

ChannelDropDown.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    rtlActive: PropTypes.bool,
};

