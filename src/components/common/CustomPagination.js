import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';

export default function CustomPagination({
    page,
    totalPages,
    customStyle,
    ...props
}) {
    return (
        <Grid container justifyContent='center'
            style={{
                marginTop: "15px",
                overflowX: "auto",
                ...customStyle
            }}>
            <Pagination {...props} count={totalPages} page={page} />
        </Grid>
    )
}
