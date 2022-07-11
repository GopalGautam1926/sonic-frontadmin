import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import moment from "moment";
import sonickeysHttps from "../../services/https/resources/sonickeys.https";
import summaryCountHttps from "../../services/https/resources/summaryCount.https";

class SummaryCountStore {
    
    @observable partnerCount = {
        loading: false,
        error: null,
        data: null,
    };

    @observable encodesCount = {
        loading: false,
        error: null,
        data: null,
    };

    @observable companyCount = {
        loading: false,
        error: null,
        data: "0",
    };

    @observable playsCount = {
        loading: false,
        error: null,
        data: "0",
    };

    @observable tracksCount = {
        loading: false,
        error: null,
        data: "0",
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
    };

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

    /**
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    @action
    fetchEncodesCount() {
        this.encodesCount = {
            error: null,
            loading: true, 
            data: null,
        }

        let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        const options = {
            params: {
                "createdAt>": `date(${startDate})` || undefined,
                "createdAt<": `date(${endDate})` || undefined,
                "relation_partner._id": this.filters.partnerName?._id || undefined,
                "relation_company._id": this.filters.companyName?._id || undefined,
                "contentOwner": this.filters.artist ? `/${this.filters.artist}/i` : undefined,
                "contentName": this.filters.track ? `/${this.filters.track}/i` : undefined,
                channel: this.filters.channel !== "ALL" ? this.filters.channel : undefined,
            },
        }

        summaryCountHttps
            .fetchSonicKeysCount(options)
            .then(({ data }) => {
                log("Encodes count", data);
                this.encodesCount = {
                    error: null,
                    loading: false, 
                    data: data,
                }
            })
            .catch((err) => {
                log("encodes count error err", err);
                this.encodesCount = {
                    error: err?.message,
                    loading: false, 
                    data: 0,
                }
            });

        // summaryCountHttps
        //     .fetchPartnersCount(options)
        //     .then(({ data }) => {
        //         log("Encodes coundt", data);
        //         this.encodesCount = data;
        //         this.loading = false;
        //     })
        //     .catch((err) => {
        //         log("encodes count error err", err);
        //         this.encodesCount = false;
        //         this.error = err?.message;
        //     });
    }
}

export const summaryCountStore = new SummaryCountStore();
