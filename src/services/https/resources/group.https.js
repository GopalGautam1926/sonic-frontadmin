import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";

class GroupHttps {
    constructor() { }

    /**
     * Fetch all sonickeys
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    fetchGroups(options = {}) {
        return AppWebRequest({
            method: "get",
            url: "/groups",
            ...options,
        });
    }

    async getGroupByName(name) {
        const { data } = await AppWebRequest({
            method: "get",
            url: "/groups",
            params: {
                name: name
            }
        });

        return { data: data?.[0] }
    }

    createGroup(groupPayload, options = {}) {
        return AppWebRequest({
            method: "post",
            data: groupPayload,
            url: "/groups",
            ...options,
        });
    }
}

export default new GroupHttps();
