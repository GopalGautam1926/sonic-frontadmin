import { observable, action, computed, toJS } from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import moment from "moment";
import reportsHttps from "../../services/https/resources/reports.https";
import { toast } from "react-toastify";
import fileDownload from "js-file-download";

class ReportsDetectionStore {
    @observable loading = false;
    @observable error = null;
    @observable detection = {
        docs: [],
        totalDocs: 0,
        offset: 0,
        limit: 10,
        totalPages: 0,
        page: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0,
    };

    @observable dateRange = {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    };

    @observable filters = {
        channel: "ALL",
        country: "",
        radiostation: "",
        artist: "",
        track: "",
        partnerName: {},
        companyName: {},
        detectionTablePage: 1,
    };
    @observable detectionTablePage = 1;

    constructor() { }

    /** DATE RANGE */
    @computed
    get getDateRange() {
        return toJS(this.dateRange);
    }

    @action
    changeDateRange(dateRange) {
        this.dateRange = dateRange;
    }

    /** FILTERS */
    @computed
    get getFilters() {
        return toJS(this.filters);
    }

    @action
    changeFilters(filters) {
        this.filters = filters;
    }

    @action
    resetFilter() {
        this.filters = {
            channel: "ALL",
            country: "",
            radiostation: "",
            artist: "",
            track: "",
            partnerName: {},
            companyName: {},
        };
    }

    /** PAGINATION */
    @computed
    get getDetectionTablePage() {
        return toJS(this.detectionTablePage);
    }

    @action
    changeDetectionTablePage(page) {
        this.detectionTablePage = page;
    }

    /** FETCH STORE PLAYS */
    @computed
    get getDetectionReports() {
        return toJS(this.detection);
    }

    /**
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    @action
    fetchReportsDetection(page = 1, playsBy) {
        this.loading = true;
        this.error = null;

        let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        const options = {
            params: {
                playsBy: playsBy || undefined,
                limit: this.detection.limit,
                page: page,
                skip: page > 1 ? (page - 1) * this.detection.limit : 0,
                "detectedAt>": this.dateRange.startDate ? `date(${startDate})` : undefined,
                "detectedAt<": this.dateRange.endDate ? `date(${endDate})` : undefined,
                channel: this.filters.channel !== "ALL" ? this.filters.channel : undefined,
                "relation_radioStation.country": this.filters.country || undefined,
                "relation_radioStation.name": this.filters.radiostation || undefined,
                "relation_sonicKey.contentOwner": this.filters.artist ? `/${this.filters.artist}/i` : undefined,
                "relation_sonicKey.contentName": this.filters.track ? `/${this.filters.track}/i` : undefined,
                "relation_sonicKey.partner._id": this.filters.partnerName?._id || undefined,
                "relation_sonicKey.company._id": this.filters.companyName?._id || undefined,
            },
        };

        reportsHttps.fetchPlays(options)
            .then(({ data }) => {
                log("Detected Plays", data);
                this.detection = data;
                this.loading = false;
            })
            .catch((err) => {
                log("Detected Plays err", err);
                this.loading = false;
                this.error = err;
            });
    }


    /**
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    @action
    exportReportsDetectionData(format, playsBy) {
        let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        const options = {
            params: {
                playsBy: playsBy || undefined,
                limit: 2000,
                page: 1,
                "detectedAt>": this.dateRange.startDate ? `date(${startDate})` : undefined,
                "detectedAt<": this.dateRange.endDate ? `date(${endDate})` : undefined,
                channel: this.filters.channel !== "ALL" ? this.filters.channel : undefined,
                "relation_radioStation.country": this.filters.country || undefined,
                "relation_radioStation.name": this.filters.radiostation || undefined,
                "relation_sonicKey.contentOwner": this.filters.artist ? `/${this.filters.artist}/i` : undefined,
                "relation_sonicKey.contentName": this.filters.track ? `/${this.filters.track}/i` : undefined,
                "relation_sonicKey.partner._id": this.filters.partnerName?._id || undefined,
                "relation_sonicKey.company._id": this.filters.companyName?._id || undefined,
            },
        };

        reportsHttps.exportPlays(format, options)
            .then(({ data }) => {
                log("Export Detected Plays", data);
                if (format === "xlsx") {
                    fileDownload(data, `${playsBy || "Track-Plays"} Reports Export-xlsx-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")}).xlsx`);
                } else {
                    fileDownload(data, `${playsBy || "Track-Plays"} Reports Export-csv-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")}).csv`);
                }
            })
            .catch((err) => {
                log("Export Detected Plays err", err);
                toast.error(err.message);
            });
    }

    /**
     *delete play from store
     * @param {string} playId
     */
    async deletePlay(playId) {
        return reportsHttps.deletePlay(playId).then(({ data }) => {
            this.detection.docs = this.detection.docs.filter((ply) => ply?._id !== playId);
            this.detection.totalDocs -= 1;
            return data;
        });
    }
}

export const reportsdetectionStore = new ReportsDetectionStore();
