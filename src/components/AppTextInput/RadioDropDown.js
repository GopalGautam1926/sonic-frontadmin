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
import { useStore } from "../../stores";

export default function RadioDropDown({
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
}) {
    const { radioStationStore } = useStore();
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
                {radioStationStore?.getRadioStations?.docs?.map((radio) => (
                    <option style={{ cursor: "pointer" }} key={radio._id} value={radio.name}>{radio.name}</option>
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

RadioDropDown.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    rtlActive: PropTypes.bool,
};

