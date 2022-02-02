import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import usersHttps from "../../services/https/resources/users.https";
import deepmerge from "deepmerge";
import moment from "moment";

class UserStore {
    @observable loading = false;
    @observable error = null;
    @observable users = {
        docs: [],
        totalDocs: 0,
        offset: 0,
        limit: 10,
        totalPages: 0,
        page: 1,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0,
    };

    constructor() {
        // makeObservable(this);
    }

    @observable dateRange = {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    };
    @observable filters = {
        email: "",
        phone: "",
        sub: "",
        company: "",
        group: "",
        username: "",
        userTablePage: 1
    };
    @observable userTablePage = 1;

    @computed
    get getUserTablePage() {
        return toJS(this.userTablePage);
    }

    @action
    changeUserTablePage(page) {
        this.userTablePage = page;
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

    @action
    resetFilter() {
        this.filters = {
            email: "",
            phone: "",
            sub: "",
            company: "",
            group: "",
            username: "",
        }
    }

    @computed
    get getUsers() {
        return toJS(this.users);
    }

    /**
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */

    @action
    fetchUsers(page = 1, options = {}) {
        this.loading = true;
        this.error = null;

        let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        let newOptions = {
            params: {
                sort: "-createdAt",
                limit: this.users.limit,
                page: page,
                skip: page > 1 ? (page - 1) * this.users.limit : 0,
                "createdAt>": `date(${startDate})` || undefined,
                "createdAt<": `date(${endDate})` || undefined,
                "username": this.filters.username || undefined,
                "email": this.filters.email || undefined,
                "phone_number": this.filters.phone || undefined,
                "sub": this.filters.sub || undefined,
                "groups": this.filters.group || undefined,
                "companies": this.filters.company || undefined,
            }
        }

        options = deepmerge(newOptions, options)

        usersHttps
            .getUsers(options)
            .then(({ data }) => {
                log("Users", data);
                this.users = data;
                this.loading = false;
            })
            .catch((err) => {
                log("Users err", err);
                this.loading = false;
                this.error = err;
            });
    }

    @action
    addNewUser(userData) {
        this.users.totalDocs += 1
        this.users.docs.unshift(userData)
    }

    /**
   *update user to store
   * @param {string} id
   * @param {object} payload
   */
    @action
    updateUser(id, payload) {
        const elementsIndex = this.users.docs.findIndex(element => element._id == id)
        this.users.docs[elementsIndex] = { ...this.users.docs[elementsIndex], ...payload }
    }
}

export const userStore = new UserStore();
