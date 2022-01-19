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
    @observable groups = []

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
                this.groups = data
                this.loading = false;
            })
            .catch((err) => {
                log("Group Error", err)
                this.error = err;
                this.loading = false;
            })
    }

    @action
    addGroup(groupData) {
        this.groups.push(groupData)
    }
}

export const groupStore = new GroupStore()