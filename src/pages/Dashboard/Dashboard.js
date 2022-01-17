import { Grid } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import { LicenseKeyStats } from "../KeysManagement/LicenseKeys/components/LicenseKeyStats";
import ApiKeyStats from "../KeysManagement/ApiKeys/components/ApiKeyStats";
import { RadioStationStats } from "../RadioManagement/RadioStation/components/RadioStationStats";
import CompaniesStats from "../CompanyManagement/components/CompaniesStats";
import PlaysStats from "../SonicKeyManagement/components/PlaysStats";
import UserStats from "../UserManagement/components/UserStats";
import GroupStats from "../GroupManagement/components/GroupStats";

export default function Dashboard() {
  const classes = useStyles();
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

        {/* <Grid item xs={12} sm={6} md={3}>
          <PlaysStats />
        </Grid> */}

        <Grid item xs={12} sm={6} md={3}>
          <CompaniesStats />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <GroupStats />
        </Grid>
      </Grid>
    </div>
  );
}
