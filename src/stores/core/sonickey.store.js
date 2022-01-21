import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import deepmerge from 'deepmerge'
import sonickeysHttps from "../../services/https/resources/sonickeys.https";
import moment from "moment";

class SonicKeyStore {
    @observable loading = false;
    @observable error = null;
    @observable plays = {
        docs: [],
        totalDocs: 0,
        offset: 0,
        limit: 0,
        totalPages: 0,
        page: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0,
    };
    constructor() {
        // makeObservable(this);
    }

    @computed
    get getPlays() {
        return toJS(this.plays);
    }

    /**
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    @action
    fetchPlays(options = {}) {
        this.loading = true;
        this.error = null;
        log("Options", options);
        const defaultOptions = {
            params: {
                // sort: '-detectedAt',
                // limit: options.limit,
                // page: options.page,
                // skip: options.page > 1 ? (options.page - 1) * options.limit : 0,
                limit: 1000,
                channel: options.channel !== "ALL" ? options.channel : undefined,
                "relation_sonicKey.sonicKey": options.sonickey ? options.sonickey : undefined,
                "relation_radioStation.country": options.country ? options.country : undefined,
                "relation_radioStation.name": options.radiostation ? options.radiostation : undefined,
                "relation_sonicKey.contentOwner": options.artist ? options.artist : undefined,
                "relation_sonicKey.originalFileName": options.track ? options.track : undefined,
                "relation_sonicKey.label": options.label ? options.label : undefined,
                "relation_sonicKey.distributor": options.distributor ? options.distributor : undefined,
                "relation_owner.username": options.username ? options.username : undefined,
            },
        }
        options = deepmerge(defaultOptions, options)
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

export const sonickeyStore = new SonicKeyStore();
