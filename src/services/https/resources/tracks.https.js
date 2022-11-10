
import { AppWebRequest } from "../NetworkManager";

class TracksHttps {

    fetchTracks(params = {}) {
        return AppWebRequest({
            method: "get",
            url: "/tracks",
            params:params,
        });
    }
}

export default new TracksHttps();