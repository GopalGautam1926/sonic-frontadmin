import {
    observable,
    action,
    computed,
    toJS
} from "mobx";

import { log } from "../../utils/app.debug";
import partnerHttps from "../../services/https/resources/partner.https";
import deepmerge from "deepmerge";

class PartnerStore {
    @observable loading = false;
    @observable error = null;
    @observable partner = {
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

    @observable partnerTablePage = 1;

    //Pagination
    @computed
    get getPartnerTablePage() {
        return toJS(this.partnerTablePage);
    }

    @action
    changePartnerTablePage(page) {
        this.partnerTablePage = page;
    }
    /* ----------------------------- */


    @observable dateRange = {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    };
    @observable filters = {
        name: "",
        _id: "",
        partnerType: "",
        owner: "",
    };

    @computed
    get getDateRange() {
        return toJS(this.dateRange);
    }

    @action
    changeDateRange(dateRange) {
        this.dateRange = dateRange;
    }

    @computed
    get getFilters() {
        return toJS(this.filters);
    }

    @action
    changeFilters(filters) {
        this.filters = filters;
    }

    @action
    resetFilter() {
        this.filters = {
            name: "",
            _id: "",
            partnerType: "",
            owner: "",
        }
    }

    @computed
    get getPartner() {
        return toJS(this.partner);
    }

    /**
 * @param {AxiosRequestConfig} options
 * @returns {Promise<any>}
 */

    @action
    fetchPartners( page = 1, options = {}) {
        this.error = null;
        this.loading = true;

        // let startDate = moment(this.dateRange.startDate).startOf("days").toISOString();
        // let endDate = moment(this.dateRange.endDate).endOf("days").toISOString();

        let newOptions = {
            params: {
                sort: "-createdAt",
                limit: this.partner.limit,
                page: page,
                skip: page > 1 ? (page - 1) * this.partner.limit : 0,

                "name": this.filters.name ? `/${this.filters.name}/i` : undefined,
                "partnerType": this.filters.partnerType ? `${this.filters.partnerType}` : undefined,
                "_id": this.filters._id ? `${this.filters._id}` : undefined,
                "relation_owner.username": this.filters.owner || undefined,
            }
        }

        options = deepmerge(newOptions, options)
        
        partnerHttps.fetchPartners(options)
            .then(({ data }) => {
                log("Fetched Partner Data", data)
                this.partner = data
                this.loading = false;
            })
            .catch((err) => {
                log("Fetched Partner Error", err)
                this.error = err;
                this.loading = false;
            })
    }

    @action
    addPartner(partnerData) {
        this.partner.totalDocs += 1
        this.partner.docs.unshift(partnerData)
    }

    /**
    *update company to store
    * @param {string} key
    * @param {object} payload
    */
    @action
    updatePartner(id, payload) {
        const elementsIndex = this.partner.docs.findIndex(element => element._id === id)
        this.partner.docs[elementsIndex] = { ...this.partner.docs[elementsIndex], ...payload }
    }

    /**
    *remove company from store
    * @param {string} id
    */
    @action
    removePartner(id) {
        this.partner = this.partner.filter(
            (cpy) => cpy?._id !== id
        );
    }
}

export const partnerStore = new PartnerStore()