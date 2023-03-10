import React from "react";
import FancyCard from "../../../../components/FancyCard/FancyCard";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { getRouteNames } from "../../../../routes/routes.data";
import { useStore } from "../../../../stores";
import { observer } from "mobx-react";
import { CircularProgress } from "@material-ui/core";
import AppLink from "../../../../components/Link";
import { useTheme } from "@material-ui/core";

export const LicenseKeyStats = observer(() => {
  const { licenseKeyStore } = useStore();
  const theme = useTheme();

  var count = 0;
  if (licenseKeyStore.error) {
    count = <span style={{ color: "red" }}>Error</span>;
  } else if (licenseKeyStore.loading) {
    count = <CircularProgress size={15} color="inherit" />;
  } else {
    count = licenseKeyStore.getLicenseKeys?.totalDocs || 0;
  }
  return (
    <FancyCard
      cardHeader={
        <FancyCard.CardHeader icon>
          {(headerClasses) => (
            <>
              <FancyCard.CardIcon color="purple" className='cardIconContainer'>
                <VpnKeyIcon style={{fontSize: theme.dashboardIconSize}} />
              </FancyCard.CardIcon>
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <p className={headerClasses.cardCategory}>Licenses</p>
                <h3 className={headerClasses.cardTitle}>{count}</h3>
              </div>
            </>
          )}
        </FancyCard.CardHeader>
      }
    >
      <FancyCard.CardContent>
        <FancyCard.Divider />
        <AppLink to={getRouteNames()["km_licensekeys"]}>Add new key</AppLink>
      </FancyCard.CardContent>
    </FancyCard>
  );
});
