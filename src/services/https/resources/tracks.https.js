import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";

class TracksHttps {
    constructor() { }

    fetchTracks(params = {}) {
        return AppWebRequest({
            method: "get",
            url: "/tracks",
            params:params,
        });
    }
}

export default new TracksHttps();