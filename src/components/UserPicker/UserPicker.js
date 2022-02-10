/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStore } from '../../stores';

export default function UserPicker({
    labelText,
    placeholder,
    optionsData,
    noOptionsText,
    onChange,
    defaultValue,
    options,
    ...props
}) {

    const { userStore } = useStore();

    return (
        <Autocomplete
            {...props}
            id="user-id"
            defaultValue={null}
            noOptionsText={noOptionsText || "No Data"}
            options={userStore.getUsers.docs}
            getOptionLabel={(option) => option?.username}
            onChange={onChange}
            renderInput={(params) =>
                <TextField
                    {...params}
                    fullWidth
                    placeholder={placeholder || ""}
                    label={labelText || ""}
                />
            }
        />
    );
}