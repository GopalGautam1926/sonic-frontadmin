import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import usersHttps from "../../services/https/resources/users.https";

class ProfileStore {
    @observable loading = false;
    @observable error = null;
    @observable profile = {};

    constructor() {
        // makeObservable(this);
    }

    @computed
    get getProfile() {
        return toJS(this.profile);
    }

    /**
     * @param {AxiosRequestConfig}
     * @returns {Promise<any>}
     */

    @action
    fetchAdminProfile() {
        this.loading = true;
        this.error = null;

        usersHttps
            .getAdminProfile()
            .then(({ data }) => {
                // log("Admin..", data);
                this.profile = data;
                this.loading = false;
            })
            .catch((err) => {
                log("Admin err", err);
                this.loading = false;
                this.error = err;
            });
    }
}

export const profileStore = new ProfileStore();
