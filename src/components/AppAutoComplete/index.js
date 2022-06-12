/* eslint-disable no-use-before-define */
import React from 'react';
import { CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppButton from '../AppButton/AppButton';

export default function AppAutoComplete(props) {
    const UserLoading = () => {
        return (
            <>
                {props?.loading ?
                    <Grid container direction='column' alignItems='center'>
                        <CircularProgress />
                        <Typography>Searching user...</Typography>
                    </Grid> :
                    props?.data === undefined ?
                        <Grid container direction='column' alignItems='center'>
                            <Typography>Start typing...</Typography>
                        </Grid> :
                        props?.data?.length === 0 &&
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
                <Typography>{props?.error?.message}</Typography>
                <AppButton onClick={(e, v) => props?.setAutoComPleteAction(v)} color='error'>Try again...</AppButton>
            </Grid>
        )
    }

    return (
        <Autocomplete
            {...props}
            id="auto-complete"
            noOptionsText={props?.error ? <UserFetchingError /> : <UserLoading />}
            options={props?.data || []}
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
                        fullWidth
                        placeholder={props?.placeholder || ""}
                        label={props?.labelText || ""}
                    />
                )
            }}
        />
    );
}

