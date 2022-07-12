import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStore } from '../../../../stores';
import { log } from '../../../../utils/app.debug';

function DataLoading({ error, loading, data }) {

    const { summaryCountStore } = useStore();
    log("count of summary", summaryCountStore)
    log("error, loading, data", error, loading, data)

    if (error) {
        return <div>{error}</div>
    } else if (loading) {
        return <div><CircularProgress size={18} /></div>
    } else {
        return <div>{data}</div>
    }
}

export default observer(DataLoading)