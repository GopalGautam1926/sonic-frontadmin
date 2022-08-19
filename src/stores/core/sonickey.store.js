import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import moment from "moment";
import reportsHttps from "../../services/https/resources/reports.https";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";

class SonicKeyStore {
    @observable loading = false;
    @observable error = null;
    @observable sonickey = {
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
        partnerName: {},
        companyName: {},
        userName: {},
        label: "",
        track: "",
        artist: "",
        channel: "ALL",
        sonickey: "",
        trackId: "",
        sonickeyTablePage: 1,
    };
    @observable sonickeyTablePage = 1;

    constructor() { }

    //DATE RANGE
    @computed
    get getDateRange() {
        return toJS(this.dateRange);
    }

    @action
    changeDateRange(dateRange) {
        this.dateRange = dateRange;
    }

    //FILTERS
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
            partnerName: {},
            companyName: {},
            userName: {},
            track: "",
            artist: "",
            channel: "ALL",
            sonickey: "",
            trackId: "",
            label: ""
        }
    }

    //PAGINATION
    @computed
    get getSonicKeyTablePage() {
        return toJS(this.sonickeyTablePage);
    }

    @action
    changeSonicKeyTablePage(page) {
        this.sonickeyTablePage = page;
    }

    //FETCH SONICKEYS
    @computed
    get getSonicKeys() {
        return toJS(this.sonickey);
    }

    /**
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    @action
    fetchSonicKeys(page = 1) {
        this.loading = true;
        this.error = null;

        let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        let options = {
            params: {
                sort: '-createdAt',
                limit: this.sonickey.limit,
                page: page,
                skip: page > 1 ? (page - 1) * this.sonickey.limit : 0,
                "createdAt>": `date(${startDate})` || undefined,
                "createdAt<": `date(${endDate})` || undefined,
                "relation_partner._id": this.filters.partnerName?._id || undefined,
                "relation_company._id": this.filters.companyName?._id || undefined,
                "contentOwner": this.filters.artist ? `/${this.filters.artist}/i` : undefined,
                "contentName": this.filters.track ? `/${this.filters.track}/i` : undefined,
                "channel": this.filters.channel !== "ALL" ? this.filters.channel : undefined,
                "sonicKey": this.filters.sonickey || undefined,
                "relation_track._id": this.filters.trackId || undefined,
                "label": this.filters.label || undefined,
            },
        }

        if (this.filters.userName?._id) {
            options = {
                ...options,
                params: {
                    ...options.params,
                    filter: {
                        $or: [{ "createdBy": `${this.filters.userName?._id}` }, { "owner": `${this.filters.userName?._id}` }]
                    }
                },
            }
        }

        reportsHttps
            .fetchSonicKeys(options)
            .then(({ data }) => {
                log("Sonickey", data);
                this.sonickey = data;
                this.loading = false;
            })
            .catch((err) => {
                log("Sonickey err", err);
                this.loading = false;
                this.error = err;
            });
    }

    /**
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    @action
    exportSonicKeysData(format) {
        let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        const options = {
            params: {
                sort: '-createdAt',
                limit: 2000,
                page: 1,
                "createdAt>": `date(${startDate})` || undefined,
                "createdAt<": `date(${endDate})` || undefined,
                "relation_partner._id": this.filters.partnerName?._id || undefined,
                "relation_company._id": this.filters.companyName?._id || undefined,
                "createdBy": this.filters.userName?._id || undefined,
                "contentOwner": this.filters.artist ? `/${this.filters.artist}/i` : undefined,
                "contentName": this.filters.track ? `/${this.filters.track}/i` : undefined,
                "channel": this.filters.channel !== "ALL" ? this.filters.channel : undefined,
                "sonicKey": this.filters.sonickey || undefined,
                "relation_track._id": this.filters.trackId || undefined,
                "label": this.filters.label || undefined
            },
        }

        reportsHttps
            .exportSonicKeys(format, options)
            .then(({ data }) => {
                log("Export Sonickey", data);
                if (format === "xlsx") {
                    fileDownload(data, `Encodes Report Export-xlsx-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")}).xlsx`);
                } else {
                    fileDownload(data, `Encodes Report Export-csv-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")}).csv`);
                }
            })
            .catch((err) => {
                log("Export Sonickey err", err);
                toast.error(err.message);
            });
    }
}

export const sonicKeyStore = new SonicKeyStore();
