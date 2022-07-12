import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react'

function DataLoading({ error, loading, data }) {
    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>
    } else if (loading) {
        return <div><CircularProgress size={18} /></div>
    } else {
        return <div>{data}</div>
    }
}

export default observer(DataLoading)