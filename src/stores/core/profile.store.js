import {
    observable,
    action,
    computed,
    toJS,
} from "mobx";
import { AxiosRequestConfig } from "axios";
import { log } from "../../utils/app.debug";
import usersHttps from "../../services/https/resources/users.https";
import { toast } from "react-toastify";
import { sessionStore } from "../session/session.store";
import { fetchInitialData } from "..";

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
    fetchAdminProfile(token) {
        this.loading = true;
        this.error = null;

        return usersHttps
            .getAdminProfile(token)
            .then(({ data }) => {
                log("Admin..", data);
                this.profile = data;
                this.loading = false;
                return data;
                // if (data?.userRole === "Admin") {
                //     this.profile = data;
                //     this.loading = false;
                //     fetchInitialData();
                // } else {
                //     this.loading = false;
                //     toast.error("You must be admin to access this portal")
                //     sessionStore.logout();
                // }
            })
            .catch((err) => {
                log("Admin err", err);
                this.loading = false;
                this.error = err;
                return err;
                // toast.error(err?.message)
                // sessionStore.logout();
            });
    }
}

export const profileStore = new ProfileStore();
