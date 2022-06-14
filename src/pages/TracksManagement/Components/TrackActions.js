import React from 'react'
import Popover from '@material-ui/core/Popover';
import { MenuItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { log } from '../../../utils/app.debug';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../../stores';
import cogoToast from 'cogo-toast';
import axios from 'axios';
import fileDownload from 'js-file-download'
import DownloadProgressModal from './DownloadProgressModal';
import AppButton from '../../../components/AppButton/AppButton';

export default function TrackActions({ trackData }) {
    const classes = useStyles();
    const history = useHistory();
    const { sonickeyStore, globalStore } = useStore()
    const [state, setState] = React.useState({
        openDownloadingModal: false,
        percentComplete: "0",
        pen: null
    })

    const openMenu = Boolean(state.open)

    const viewSonicKey = () => {
        let sonicKeyFilters = { ...sonickeyStore?.filters, track: trackData?._id }
        sonickeyStore.changeFilters(sonicKeyFilters)
        history.push("/admin/sonickeys-management/encoded")
    }

    const downloadTrack = () => {
        setState({ ...state, openDownloadingModal: true })
        globalStore.downloadAnyFile(trackData?.s3OriginalFileMeta?.Key).then((response) => {
            axios({
                url: response.data,
                responseType: 'blob',
                onDownloadProgress: function (progressEvent) {
                    let percent = Math.floor(progressEvent?.loaded / progressEvent?.total * 100)
                    setState({ ...state, percentComplete: percent, openDownloadingModal: true })
                }
            }).then(res => {
                fileDownload(res.data, trackData?.originalFileName);
                setState({ ...state, openDownloadingModal: false })
            }).catch(error => {
                log("Download axios error", error)
                cogoToast.error(error?.message)
                setState({ ...state, openDownloadingModal: false })
            });
        }).catch((error) => {
            log("Download error", error)
            cogoToast.error(error?.message)
            setState({ ...state, openDownloadingModal: false })
        })
    }

    return (
        <>
            <AppButton asIconButton={true} onClick={(e) => setState({ ...state, open: e.currentTarget })}>...</AppButton>
            <Popover
                id={"track action"}
                open={openMenu}
                anchorEl={state.open}
                onClose={() => setState({ ...state, open: null })}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                paperProps={{ className: classes.Popover }}
            >
                <MenuItem onClick={downloadTrack}>Download</MenuItem>
                <MenuItem onClick={viewSonicKey}>View SonicKeys</MenuItem>
            </Popover>
            <DownloadProgressModal
                open={state.openDownloadingModal}
                percentage={state.percentComplete}
                handleClose={() => setState({ ...state, openDownloadingModal: false, percentComplete: 0 })}
            />
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    Popover: {
        padding: theme.spacing(2),
        boxShadow: "none"
    },
}));