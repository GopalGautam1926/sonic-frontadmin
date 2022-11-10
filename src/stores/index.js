import React from 'react';
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
  const { licenseKeyStore, apiKeyStore, radioStationStore, sonickeyStore, companyStore, userStore,
    releaseStore, playsStore, partnerStore, tracksStore, companyReportStore, summaryCountStore } = rootStore
  licenseKeyStore.fetchLicenseKeys()
  apiKeyStore.fetchApiKeys()
  radioStationStore.fetchRadioStations()
  sonickeyStore.fetchSonicKeys()
  playsStore.fetchPlays()
  partnerStore.fetchPartners()
  tracksStore.fetchTracks()
  companyStore.fetchCompanies()
  userStore.fetchUsers()
  releaseStore.fetchVersions()
  companyReportStore.fetchCompaniesReports()
  summaryCountStore.fetchPartnersCount()
  summaryCountStore.fetchCompanyCount()
  summaryCountStore.fetchEncodesCount()
  summaryCountStore.fetchPlaysCount()
  summaryCountStore.fetchTracksCount()
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