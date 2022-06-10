/* eslint-disable no-use-before-define */
import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function AppAutoComplete(props) {
    return (
        <Autocomplete
            id="auto-complete"
            options={props?.data || []}
            noOptionsText={props?.error ? props?.error : props?.loading ? "Loading..." : props?.data === undefined ? "Start typing..." : props?.data?.length === 0 && "No Data"}
            getOptionLabel={(option) => props?.setAutoCompleteOptions(option)}
            renderOption={(option) => (
                <Grid style={{ margin: 0, padding: '5px 0px' }}>
                    <Grid>{props?.setAutoCompleteOptions(option)}</Grid>
                    <Grid style={{ fontSize: '13px' }}>{props?.setAutoCompleteOptionsLabel(option)}</Grid>
                </Grid>
            )}
            onChange={(e, v) => props?.getSelectedValue(e, v)}
            onInputChange={(e, v) => props?.setAutoComPleteAction(v)}
            style={{ width: "100%" }}
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        helperText={props?.helperText || ""}
                        placeholder={props?.placeholder || ""}
                        label={props?.labelText || ""}
                    />
                )
            }}
        />
    );
}

