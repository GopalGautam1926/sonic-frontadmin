import { CircularProgress } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AppWebRequest } from '../../../../services/https/NetworkManager'
import { useStore } from '../../../../stores'
import { log } from '../../../../utils/app.debug'

const HighLevelCounts = (props) => {
    const { companyReportStore } = useStore();

    log("Selected company", props)

    React.useEffect(() => {
        let param = {
            "relation_radioStation.name": companyReportStore?.getFilters?.radioStation ? companyReportStore?.getFilters?.radioStation : undefined,
            "relation_sonicKey.company._id": props?.company?._id,
            "relation_sonicKey.originalFileName": companyReportStore?.getFilters?.track ? `/${companyReportStore?.getFilters?.track}/i` : undefined,
            "relation_sonicKey.contentOwner": companyReportStore?.getFilters?.artist ? `/${companyReportStore?.getFilters?.artist}/i` : undefined,
            "channel": companyReportStore?.getFilters?.channel !== "ALL" ? companyReportStore?.getFilters?.channel : undefined,
        }
        if (props?.plays) {
            AppWebRequest({
                method: "get",
                url: "detections/get-monitor-high-level-count-data",
                params: param
            })
                .then((res) => {
                    log("monitor-high-level-count-data", res)
                    companyReportStore?.updateCompany({
                        ...props?.company,
                        highLevelCountData: { ...res?.data },
                        highLevelCountError: null
                    })
                }).catch((err) => {
                    log("monitor-high-level-count-data error", err)
                    companyReportStore?.updateCompany({
                        ...props?.company,
                        highLevelCountError: err?.message,
                        highLevelCountData: null,
                    })
                })
        }
    }, [])

    if (props?.company?.highLevelCountError) {
        return (
            <div style={{ color: "red" }}>error</div>
        )
    }
    else if (props?.company?.highLevelCountData) {
        if (props?.plays) return <div>{props?.company?.highLevelCountData?.myPlaysCount}</div>
        if (props?.tracks) return <div>{props?.company?.highLevelCountData?.myTracksCount}</div>
        if (props?.artists) return <div>{props?.company?.highLevelCountData?.myArtistsCount}</div>
        if (props?.radioStations) return <div>{props?.company?.highLevelCountData?.myRadioStationCount}</div>
        if (props?.countries) return <div>{props?.company?.highLevelCountData?.myCountriesCount}</div>
        return "0"
    }
    else {
        return (
            <div><CircularProgress size={18} /></div>
        )
    }
}

export default observer(HighLevelCounts)