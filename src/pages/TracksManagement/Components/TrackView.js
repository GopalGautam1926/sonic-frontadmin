import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import { Grid, TableCell, TableRow, Typography, Table } from '@material-ui/core';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import AppButton from '../../../components/AppButton/AppButton';
import { log } from '../../../utils/app.debug';

export default function TrackView({ isOpen, close, trackData = {} }) {


    log("Track Data", trackData)

    const closePopUp = () => {
        close()
    }

    return (
        <Dialog key="view track popup" open={isOpen} maxWidth="sm" fullWidth>
            <Grid style={{ padding: "30px" }}>
                <Grid container justifyContent='space-between'>
                    <Grid >
                        <Typography variant="h4">{trackData?.title || "---"}</Typography>
                        <Typography>by {trackData?.trackMetaData?.contentOwner || trackData?.artist || "---"}</Typography>
                    </Grid>
                    <CloseIcon onClick={closePopUp} style={{ cursor: "pointer" }} />
                </Grid>

                <Grid style={{ height: "300px", marginTop: "20px", overflow: "auto" }}>
                    <Table>
                        <TableRow>
                            <TCell cell1={true}>TRACK ID</TCell>
                            <TCell cell1={false}>{trackData?._id || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>TITLE</TCell>
                            <TCell cell1={false}>{trackData?.trackMetaData?.contentName || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>ORIGINAL FILENAME</TCell>
                            <TCell cell1={false}>{trackData?.originalFileName || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>VERSION</TCell>
                            <TCell cell1={false}>{trackData?.trackMetaData?.version || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>LABEL</TCell>
                            <TCell cell1={false}>{trackData?.trackMetaData?.label || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>ARTIST</TCell>
                            <TCell cell1={false}>{trackData?.trackMetaData?.contentOwner || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>DISTRIBUTOR</TCell>
                            <TCell cell1={false}>{trackData?.trackMetaData?.distributor || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>FILE TYPE</TCell>
                            <TCell cell1={false}>{trackData?.trackMetaData?.contentFileType || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>ENCODED DATE</TCell>
                            <TCell cell1={false}>{moment(trackData?.createdAt).format("DD/MM/YYYY") || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>SYSTEM/PARTNER ID</TCell>
                            <TCell cell1={false}>{trackData?.owner?._id || trackData?.company?._id || trackData?.partner?._id || "---"}</TCell>
                        </TableRow>
                    </Table>
                </Grid>

                <Grid container justifyContent='flex-end' className='mt-2'>
                    <AppButton
                        onClick={closePopUp}
                    >
                        Close
                    </AppButton>
                </Grid>
            </Grid>
        </Dialog>
    )
}

const TCell = ({ children, cell1, ...props }) => {
    if (cell1) {
        return (
            <TableCell size='small' width="35%" {...props}>
                <Typography variant="h7">{children}</Typography>
            </TableCell>
        )
    }
    else {
        return (
            <TableCell size='small' width="65%"{...props}>
                <Typography variant="h8">{children}</Typography>
            </TableCell>
        )
    }
}