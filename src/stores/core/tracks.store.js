import deepmerge from "deepmerge";
import { observable, action, computed, toJS } from "mobx";
import moment from "moment";
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

    @observable filters = {
        id: "",
        title: "",
        distributor: "",
        label: "",
        artist: "",
        user: "",
        company: ""
    }

    @action
    fetchTracks(page = 1) {
        this.error = null;
        this.loading = true;
        let newEndDate = moment(this?.dateRange?.endDate).endOf("days").toISOString()
        let params = new URLSearchParams(`createdAt>=${moment(this?.dateRange?.startDate).format("YYYY-MM-DD")}&createdAt<=date(${newEndDate})`)
        params.append("limit", this?.tracks?.limit);
        params.append("page", page)
        params.append("skip", page > 1 ? (page - 1) * this?.tracks?.limit : 0)

        let filterArray = []

        if (this?.filters?.title) filterArray.push({ "trackMetaData.contentName": { "$regex": this?.filters?.title, "$options": "i" } }, { "originalFileName": { "$regex": this?.filters?.title, "$options": "i" } })
        if (this?.filters?.id) filterArray.push({ "_id":  this?.filters?.id })
        if (this?.filters?.artist) filterArray.push({ "trackMetaData.contentOwner": { "$regex": this?.filters?.artist, "$options": "i" } }, { "artist": { "$regex": this?.filters?.artist, "$options": "i" } })
        if (this?.filters?.distributor) filterArray.push({ "trackMetaData.distributor": { "$regex": this?.filters?.distributor, "$options": "i" } })
        if (this?.filters?.label) filterArray.push({ "trackMetaData.label": { "$regex": this?.filters?.label, "$options": "i" } })
        if (this?.filters?.company) filterArray.push({ "trackMetaData.company":  this?.filters?.company?._id })
        if (this?.filters?.user) filterArray.push({ "trackMetaData.owner": this?.filters?.user?._id })

        if (filterArray.length !== 0) params.append("filter", JSON.stringify({ "$or": filterArray }))

        tracksHttps.fetchTracks(params)
            .then(({ data }) => {
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

    @action
    changeFilters(filters) {
        this.filters = filters
    }

    @action
    resetFilter() {
        this.filters = {
            id: "",
            title: "",
            distributor: "",
            label: "",
            artist: "",
            user: "",
            company: ""
        }
    }

    @action
    changeDateRange(dates) {
        this.dateRange = dates
    }
}

export const tracksStore = new TracksStore()