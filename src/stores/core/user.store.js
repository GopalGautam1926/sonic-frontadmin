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

        log("user page", page)

        let newOptions = {
            params: {
                sort: "-createdAt",
                limit: this.users.limit,
                page: page,
                skip: page > 1 ? (page - 1) * this.users.limit : 0
            }
        }

        options = deepmerge(newOptions, options)

        log("user options", options)

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
}

export const userStore = new UserStore();
