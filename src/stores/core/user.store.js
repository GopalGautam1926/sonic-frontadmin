import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
// import { AxiosRequestConfig } from "axios";
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

    // constructor() {
    //     // makeObservable(this);
    // }

    @observable dateRange = {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    };
    @observable filters = {
        email: "",
        phone: "",
        sub: "",
        partner: {},
        company: {},
        associatedRole: "",
        username: "",
        status: "",
        userTablePage: 1
    };
    @observable userTablePage = 1;

    //Pagination
    @computed
    get getUserTablePage() {
        return toJS(this.userTablePage);
    }

    @action
    changeUserTablePage(page) {
        this.userTablePage = page;
    }
    /* ----------------------------- */

    //Date Range
    @computed
    get getDateRange() {
        return toJS(this.dateRange);
    }

    @action
    changeDateRange(dateRange) {
        this.dateRange = dateRange;
    }
    /* ----------------------------- */

    //User Filters
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
            partner: {},
            company: {},
            associatedRole: "",
            username: "",
            status: ""
        }
    }
    /* ----------------------------- */

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
                "username": this.filters.username ? `/${this.filters.username}/i` : undefined,
                "email": this.filters.email ? this.filters.email : undefined,
                "_id": this.filters.sub || undefined,
                "userRole": this.filters.associatedRole || undefined,
                "enabled": this.filters.status ? this.filters.status === "Active" ? true : false : undefined,
                "relation_company._id": this.filters.company?._id || undefined,
                "relation_partner._id": this.filters.partner?._id || undefined,
                "relation_partner.name": this.filters.accountName && this.filters.accountType === "Partner" ? `/${this.filters.accountName}/i` : undefined,
                "relation_company.name": this.filters.accountName && this.filters.accountType === "Company" ? `/${this.filters.accountName}/i` : undefined,
            }
        }

        options = deepmerge(newOptions, options)

        usersHttps
            .getUsers(options)
            .then(({ data }) => {
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
        const elementsIndex = this.users.docs.findIndex(element => element._id === id)
        this.users.docs[elementsIndex] = { ...this.users.docs[elementsIndex], ...payload }
    }

    /**
   *delete user from store
   * @param {string} userId
   */
    async deleteUser(userId) {
        return usersHttps.deleteUser(userId).then(({ data }) => {
            this.users.docs = this.users.docs.filter((user) => user?._id !== userId);
            this.users.totalDocs -= 1;
            return data;
        });
    }
}

export const userStore = new UserStore();
