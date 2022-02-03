/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStore } from '../../stores';

export default function UserPicker({
    labelText,
    inputProps,
    options,
    onChange,
    ...props
}) {
    const { userStore } = useStore();
    // const [user, setUser] = React.useState({

    // })

    return (
        <Autocomplete
            {...props}
            id="auto-complete"
            fullWidth
            noOptionsText="No users"
            options={options}
            getOptionLabel={(option) => option?._id}
            // onChange={() => }
            renderInput={(params) => <TextField {...params} label={labelText} />}
        />
    );
}