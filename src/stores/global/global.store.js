import { computed,action, toJS, observable } from "mobx";

export class GlobalStore {
  @observable text = "Hello";
  constructor() {
    // makeObservable(this);
  }
}

export const globalStore = new GlobalStore();
