import { Grid } from "@material-ui/core";
import React from "react";
import { LicenseKeyStats } from "../KeysManagement/LicenseKeys/components/LicenseKeyStats";
import ApiKeyStats from "../KeysManagement/ApiKeys/components/ApiKeyStats";
import { RadioStationStats } from "../RadioManagement/RadioStation/components/RadioStationStats";
import { CompaniesStats } from "../CompanyManagement/components/CompaniesStats";
import { PartnersStats } from "../PartnerManagement/components/PartnersStats";
import PlaysStats from "../SonicKeyManagement/Plays/components/PlaysStats";
import { UserStats } from "../UserManagement/components/UserStats";
import EncodedStats from "../SonicKeyManagement/Encoded/components/EncodedStats";
import { useStore } from "../../stores";
import { log } from "../../utils/app.debug";
import { TracksStats } from "../TracksManagement/Components/TracksStats";

export default function Dashboard() {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <LicenseKeyStats />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <ApiKeyStats />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <RadioStationStats />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <UserStats />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <CompaniesStats />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <EncodedStats />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <PlaysStats />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <PartnersStats />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TracksStats />
        </Grid>
      </Grid>
    </div>
  );
}
