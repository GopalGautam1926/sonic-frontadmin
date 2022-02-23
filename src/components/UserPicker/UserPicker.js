/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function UserPicker({
    labelText,
    placeholder,
    noOptionsText,
    onChange,
    defaultValue,
    options,
    getOptionLabel,
    ...props
}) {
    const [state, setState] = React.useState({
        input: "",
    })

    return (
        <Autocomplete
            {...props}
            id="user-id"
            defaultValue={null}
            noOptionsText={noOptionsText || "No Data"}
            options={state.input.length > 2 ? options : []}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={getOptionLabel}
            onChange={onChange}
            renderInput={(params) =>
                <TextField
                    {...params}
                    fullWidth
                    value={state.input}
                    onChange={(e) => setState({ ...state, input: e.target.value })}
                    placeholder={placeholder || ""}
                    label={labelText || ""}
                />
            }
            freeSolo={state.input.length > 2 ? false : true}
        />
    );
}