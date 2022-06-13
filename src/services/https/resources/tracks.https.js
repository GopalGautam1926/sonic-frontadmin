import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";

class TracksHttps {
    constructor() { }

    fetchTracks(options = {}) {
        return AppWebRequest({
            method: "get",
            url: "/tracks",
            ...options,
        });
    }
}

export default new TracksHttps();