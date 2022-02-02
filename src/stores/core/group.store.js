import {
    observable,
    action,
    computed,
    toJS
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import groupHttps from "../../services/https/resources/group.https";
import deepmerge from "deepmerge";
import moment from "moment";

class GroupStore {
    @observable loading = false;
    @observable error = null;
    @observable groups = []

    constructor() {
        // makeObservable(this);
    }

    @observable dateRange = {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    };
    @observable filters = {
        group: "",
        id: "",
    };

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

    @action
    resetFilter() {
        this.filters = {
            group: "",
            id: "",
        }
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

        // let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        // let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        let newOptions = {
            params: {
                sort: "-createdAt",
                // "createdAt>": `date(${startDate})` || undefined,
                // "createdAt<": `date(${endDate})` || undefined,
                // "name": this.filters.group || undefined,
                // "_id": this.filters.id || undefined,
            }
        }

        options = deepmerge(newOptions, options)

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