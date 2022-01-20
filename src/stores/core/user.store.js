import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import usersHttps from "../../services/https/resources/users.https";

class UserStore {
    @observable loading = false;
    @observable error = null;
    @observable users = [];

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
