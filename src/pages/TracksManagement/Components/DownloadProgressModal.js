import { Box, CircularProgress, Dialog, Grid, Typography } from '@material-ui/core'
import React from 'react'

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function DownloadProgressModal({ open, percentage = "0",handleClose }) {

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
            maxWidth="sm"
        >
            <Grid container style={{ padding: "30px" }} justifyContent="center" alignItems='center'>
                <Typography style={{ marginLeft: "15px", marginTop: "5px", marginRight: "10px" }}>Download in progress </Typography>
                <CircularProgressWithLabel value={percentage} />
            </Grid>
        </Dialog>
    )
}
