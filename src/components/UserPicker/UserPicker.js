/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { log } from '../../utils/app.debug';
import usersHttps from '../../services/https/resources/users.https';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import AppButton from '../AppButton/AppButton';

export default function UserPicker({
    labelText,
    placeholder,
    getFoundUser,
    ...props
}) {
    const [state, setState] = React.useState({
        loading: false,
        data: [],
        error: "",
        open: false,
        user: ""
    })

    const UserLoading = () => {
        return (
            <>
                {state.loading ?
                    <Grid container direction='column' alignItems='center'>
                        <CircularProgress />
                        <Typography>Searching user...</Typography>
                    </Grid> :
                    <Grid container direction='column' alignItems='center'>
                        <Typography>No Data</Typography>
                    </Grid>
                }
            </>
        )
    }

    const UserFetchingError = () => {
        return (
            <Grid container direction='column' alignItems='center'>
                <Typography>{state.error?.message}</Typography>
                <AppButton onClick={getUsers} color='error'>Try again...</AppButton>
            </Grid>
        )
    }

    const selectedUser = (event, value) => {
        log("SELECTED USER", value)
        getFoundUser(value);
    }

    const getUsers = (event, user) => {
        log("USER=>", user)
        setState({ ...state, user: user })
        if (user.length > 2) {
            setState({ ...state, loading: true, open: true })
            usersHttps.findUser(user).then((data) => {
                setState({ ...state, data: data, loading: false, open: true })
            }).catch((err) => {
                setState({ ...state, error: err, loading: false })
            })
        } else {
            setState({ ...state, loading: true, open: false });
        }
    };

    return (
        <Autocomplete
            {...props}
            id="user-id"
            noOptionsText={state.error ? <UserFetchingError /> : <UserLoading />}
            options={state.data?.data?.docs || []}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.username}
            onInputChange={getUsers}
            onChange={selectedUser}
            renderInput={(params) =>
                <TextField
                    {...params}
                    fullWidth
                    placeholder={placeholder || ""}
                    label={labelText || ""}
                />
            }
            freeSolo={state.open ? false : true}
        />
    );
}