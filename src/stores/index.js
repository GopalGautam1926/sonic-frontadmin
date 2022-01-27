import React, { Component } from 'react';
import { useContext } from "react";
import { createContext } from "react";
import { rootStore } from './root/root.store';


export * from './root/root.store'
export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const StoreConsumer = StoreContext.Consumer;

export const useStore = () => {
  return useContext(StoreContext);
};

export const fetchInitialData = () => {
  const { licenseKeyStore, apiKeyStore, radioStationStore, playsStore, companyStore, userStore, groupStore, sonickeyStore } = rootStore
  licenseKeyStore.fetchLicenseKeys()
  apiKeyStore.fetchApiKeys()
  radioStationStore.fetchRadioStations()
  playsStore.fetchPlays()
  companyStore.fetchCompanies()
  userStore.fetchUsers()
  groupStore.fetchGroups()
  sonickeyStore.fetchSonicKeys()
}

export function withStore(WrapperComponent) {

  return (props) => {
    return (
      <StoreConsumer>
        {(stores) => {
          return (
            <WrapperComponent {...stores} {...props} />
          );
        }}
      </StoreConsumer>
    );
  };
}