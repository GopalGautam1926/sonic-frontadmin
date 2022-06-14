import { computed,action, toJS, observable } from "mobx";
import { AppWebRequest } from "../../services/https/NetworkManager";
import { log } from "../../utils/app.debug";

export class GlobalStore {
  @observable text = "Hello";
  constructor() {
    // makeObservable(this);
  }

  @action
  downloadAnyFile = (key) => {
    log("key to download",key)
    const axiosConfig = {
        headers: {
            'Accept': 'application/json',
        }
    };
   return AppWebRequest(`/s3-file-uploads/signed-url/` + encodeURIComponent(key), "get", axiosConfig)
  }
}

export const globalStore = new GlobalStore();
