import deepmerge from "deepmerge";
import {observable,action,computed,toJS} from "mobx";
import tracksHttps from "../../services/https/resources/tracks.https";
import { log } from "../../utils/app.debug";

class TracksStore {
    constructor() {
    }

    @observable loading = false;
    @observable error = null;
    @observable tracks = {
        docs: [],
        totalDocs: 0,
        offset: 0,
        limit: 10,
        totalPages: 0,
        page: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0,
    }
    @observable dateRange = {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    };

    @action
    fetchTracks(page = 1){
        this.error = null;
        this.loading = true;

        let options = {
            params: {
                limit: this.tracks.limit,
                page: page,
                skip: page > 1 ? (page - 1) * this.tracks.limit : 0,
                sort: "-createdAt",
            }
        }

        tracksHttps.fetchTracks(options)
        .then(({data}) => {
            log("Tracks Data", data)
            this.tracks = data
            this.loading = false;
        })
        .catch((err) => {
            log("Tracks Error", err)
            this.error = err;
            this.loading = false;
        })
    }
}

export const tracksStore = new TracksStore()