import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import useStyles from "./styles";
import { TextField } from "@material-ui/core";

export default function DateField({
    formControlProps,
    labelText,
    id,
    inputProps,
    error,
    success,
}) {
    const classes = useStyles();

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
        <FormControl style={{}}
            {...formControlProps}
            className={formControlProps?.className + " " + classes.formControl}
        >
            <TextField
                label={labelText}
                type="date"
                style={{ boxShadow: "none" }}
                classes={{
                    root: marginTop,
                    disabled: classes.disabled,
                    underline: underlineClasses,
                }}
                id={id}
                {...inputProps}
                inputProps={newInputProps}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {error ? (
                <Clear className={classes.feedback + " " + classes.labelRootError} />
            ) : success ? (
                <Check className={classes.feedback + " " + classes.labelRootSuccess} />
            ) : null}
        </FormControl>
    );
}

DateField.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    rtlActive: PropTypes.bool,
};

