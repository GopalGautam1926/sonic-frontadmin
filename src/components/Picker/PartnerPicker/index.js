/* eslint-disable no-use-before-define */
import React from 'react';
import { CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppButton from '../../AppButton/AppButton';
import partnerHttps from '../../../services/https/resources/partner.https';

export default function PartnerPicker({
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
        partner: ""
    })

    const UserLoading = () => {
        return (
            <>
                {state?.loading ?
                    <Grid container direction='column' alignItems='center'>
                        <CircularProgress />
                        <Typography>Searching partner...</Typography>
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
                <AppButton onClick={getPartner} color='error'>Try again...</AppButton>
            </Grid>
        )
    }

    const getPartner = (event, partner) => {
        setState({ ...state, partner: partner })
        if (partner.length > 2) {
            setState({ ...state, loading: true, open: true })
            partnerHttps.findPartner(partner).then((data) => {
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
            getOptionLabel={(option) => option?.name || ""}
            onInputChange={getPartner}
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

