import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import sonickeysHttps from "../../services/https/resources/sonickeys.https";
import moment from "moment";

class PlaysStore {
    @observable loading = false;
    @observable error = null;
    @observable plays = {
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
        sonickey: "",
        country: "",
        radiostation: "",
        artist: "",
        track: "",
        label: "",
        distributor: "",
        companyName: "",
        groupName: "",
        username: "",
        encodedDate: "",
        playTablePage: 1,
    };
    @observable playTablePage = 1;

    constructor() {
        // makeObservable(this);
    }

    @computed
    get getDateRange() {
        return toJS(this.dateRange);
    }

    @action
    changeDateRange(dateRange) {
        this.dateRange = dateRange;
    }

    @computed
    get getFilters() {
        return toJS(this.filters);
    }

    @action
    changeFilters(filters) {
        this.filters = filters;
    }

    @computed
    get getPlayTablePage() {
        return toJS(this.playTablePage);
    }

    @action
    changePlayTablePage(page) {
        this.playTablePage = page;
    }

    @computed
    get getPlays() {
        return toJS(this.plays);
    }

    @action
    resetFilter() {
        this.filters = {
            channel: "ALL",
            sonickey: "",
            country: "",
            radiostation: "",
            artist: "",
            track: "",
            label: "",
            distributor: "",
            companyName: "",
            groupName: "",
            username: "",
            encodedDate: "",
        }
    }

    /**
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    @action
    fetchPlays(page = 1) {
        this.loading = true;
        this.error = null;

        let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();
        let startOfEncodedDate = moment(this.filters.encodedDate).startOf("days").toISOString();
        let endOfEncodedDate = moment(this.filters.encodedDate).endOf("days").toISOString();

        const options = {
            params: {
                limit: this.plays.limit,
                page: page,
                skip: page > 1 ? (page - 1) * this.plays.limit : 0,
                "detectedAt>": this.dateRange.startDate ? `date(${startDate})` : undefined,
                "detectedAt<": this.dateRange.endDate ? `date(${endDate})` : undefined,
                channel: this.filters.channel !== "ALL" ? this.filters.channel : undefined,
                "relation_sonicKey.sonicKey": this.filters.sonickey ? this.filters.sonickey : undefined,
                "relation_radioStation.country": this.filters.country ? this.filters.country : undefined,
                "relation_radioStation.name": this.filters.radiostation ? this.filters.radiostation : undefined,
                "relation_sonicKey.contentOwner": this.filters.artist ? this.filters.artist : undefined,
                "relation_sonicKey.originalFileName": this.filters.track ? this.filters.track : undefined,
                "relation_sonicKey.label": this.filters.label ? this.filters.label : undefined,
                "relation_sonicKey.distributor": this.filters.distributor ? this.filters.distributor : undefined,
                "relation_owner.username": this.filters.username ? this.filters.username : undefined,
                "relation_owner.groups": this.filters.groupName ? this.filters.groupName : undefined,
                "relation_owner.companies": this.filters.companyName ? this.filters.companyName : undefined,
                "relation_sonicKey.createdAt>": this.filters.encodedDate ? `date(${startOfEncodedDate})` : undefined,
                "relation_sonicKey.createdAt<": this.filters.encodedDate ? `date(${endOfEncodedDate})` : undefined,
            },
        }

        sonickeysHttps
            .fetchPlays(options)
            .then(({ data }) => {
                log("Plays", data);
                this.plays = data;
                this.loading = false;
            })
            .catch((err) => {
                log("Plays err", err);
                this.loading = false;
                this.error = err;
            });
    }
}

export const playsStore = new PlaysStore();
