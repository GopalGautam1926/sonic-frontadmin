import {
    observable,
    action,
    computed,
    toJS
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import groupHttps from "../../services/https/resources/group.https";

class GroupStore {
    @observable loading = false;
    @observable error = null;
    @observable groups = {
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
    }

    constructor() {
        // makeObservable(this);
    }

    @computed
    get getGroups() {
        return toJS(this.groups);
    }

    /**
 * @param {AxiosRequestConfig} options
 * @returns {Promise<any>}
 */

    @action
    fetchGroups(options = {}) {
        this.loading = true;
        this.error = null;

        groupHttps.fetchGroups(options)
            .then(({ data }) => {
                log("Group Data", data)
                this.company = data
                this.loading = false;
            })
            .catch((err) => {
                log("Group Error", err)
                this.error = err;
                this.loading = false;
            })
    }
}

export const groupStore = new GroupStore()