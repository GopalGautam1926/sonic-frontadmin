import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import deepmerge from 'deepmerge'
import usersHttps from "../../services/https/resources/users.https";

class UserStore {
    @observable loading = false;
    @observable error = null;
    @observable users = {
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
    get getUsers() {
        return toJS(this.users);
    }

    /**
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    @action
    fetchAllUsers(options = {}) {
        this.loading = true;
        this.error = null;
        const defaultOptions = {
            params: {
                sort: '-createdAt',
                limit: 1000,
            },
        }
        options = deepmerge(defaultOptions, options)
        usersHttps
            .getAllUsers(options)
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

}

export const userStore = new UserStore();
