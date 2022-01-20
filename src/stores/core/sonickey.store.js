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
import format from "date-fns/format";
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
        let newEndDate = moment(options.endDate).endOf("days").toISOString()
        const defaultOptions = {
            params: {
                sort: '-detectedAt',
                limit: 10,
                // detectedAt: `detectedAt>=${moment(options.startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`,
                channel: options.channel,
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
