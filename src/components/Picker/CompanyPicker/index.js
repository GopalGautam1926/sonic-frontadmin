/* eslint-disable no-use-before-define */
import React from 'react';
import { CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppButton from '../AppButton/AppButton';
import companyHttps from '../../../services/https/resources/company.https';

export default function AppAutoComplete({
    labelText,
    placeholder,
    getSelectedValue,
    ...props
}) {
    const [state, setState] = React.useState({
        loading: false,
        data: [],
        error: "",
        open: false,
        company: ""
    })

    const UserLoading = () => {
        return (
            <>
                {state?.loading ?
                    <Grid container direction='column' alignItems='center'>
                        <CircularProgress />
                        <Typography>Searching user...</Typography>
                    </Grid> :
                    state?.data === undefined ?
                        <Grid container direction='column' alignItems='center'>
                            <Typography>Start typing...</Typography>
                        </Grid> :
                        state?.data?.length === 0 &&
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
                <AppButton onClick={getCompany} color='error'>Try again...</AppButton>
            </Grid>
        )
    }

    const getCompany = (event, company) => {
        setState({ ...state, company: company })
        if (company.length > 2) {
            setState({ ...state, loading: true, open: true })
            companyHttps.findCompany(company).then((data) => {
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
            getOptionLabel={(option) => option?.name}
            onInputChange={getCompany}
            onChange={(e, v) => getSelectedValue(v)}
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

