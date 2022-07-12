import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
import { log } from "../../utils/app.debug";
import moment from "moment";
import summaryCountHttps from "../../services/https/resources/summaryCount.https";

class SummaryCountStore {
    @observable partnerCount = {
        loading: false,
        error: null,
        data: null,
    };

    @observable companyCount = {
        loading: false,
        error: null,
        data: null,
    };

    @observable encodesCount = {
        loading: false,
        error: null,
        data: null,
    };

    @observable playsCount = {
        loading: false,
        error: null,
        data: null,
    };

    @observable tracksCount = {
        loading: false,
        error: null,
        data: null,
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

    //ENCODES
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
    }

    //PARTNER
    fetchPartnersCount() {
        this.partnerCount = {
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
            },
        }

        summaryCountHttps
            .fetchPartnersCount(options)
            .then(({ data }) => {
                log("Partners count", data);
                this.partnerCount = {
                    error: null,
                    loading: false,
                    data: data,
                }
            })
            .catch((err) => {
                log("Partners count error err", err);
                this.partnerCount = {
                    error: err?.message,
                    loading: false,
                    data: 0,
                }
            });
    }

    //COMPANY
    fetchCompanyCount() {
        this.companyCount = {
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
            },
        }

        summaryCountHttps
            .fetchCompaniesCount(options)
            .then(({ data }) => {
                log("Company count", data);
                this.companyCount = {
                    error: null,
                    loading: false,
                    data: data,
                }
            })
            .catch((err) => {
                log("Company count error err", err);
                this.companyCount = {
                    error: err?.message,
                    loading: false,
                    data: 0,
                }
            });
    }

    //PLAYS
    fetchPlaysCount() {
        this.playsCount = {
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
            .fetchPlaysCount(options)
            .then(({ data }) => {
                log("plays count", data);
                this.playsCount = {
                    error: null,
                    loading: false,
                    data: data,
                }
            })
            .catch((err) => {
                log("Plays count error err", err);
                this.playsCount = {
                    error: err?.message,
                    loading: false,
                    data: 0,
                }
            });
    }

    //TRACKS
    fetchTracksCount() {
        this.tracksCount = {
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
            .fetchTracksCount(options)
            .then(({ data }) => {
                log("Tracks count", data);
                this.tracksCount = {
                    error: null,
                    loading: false,
                    data: 0,
                }
            })
            .catch((err) => {
                log("Tracks count error err", err);
                this.tracksCount = {
                    error: err?.message,
                    loading: false,
                    data: 0,
                }
            });
    }
}

export const summaryCountStore = new SummaryCountStore();
