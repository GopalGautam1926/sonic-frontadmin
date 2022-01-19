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
  const { licenseKeyStore, apiKeyStore, radioStationStore, sonickeyStore, userStore } = rootStore
  licenseKeyStore.fetchLicenseKeys()
  apiKeyStore.fetchApiKeys()
  radioStationStore.fetchRadioStations()
  sonickeyStore.fetchPlays()
  userStore.fetchAllUsers()
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