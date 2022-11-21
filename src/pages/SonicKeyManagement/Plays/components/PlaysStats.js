import React from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import FancyCard from "../../../../components/FancyCard/FancyCard";
import { getRouteNames } from "../../../../routes/routes.data";
import { observer } from "mobx-react";
import { useStore } from "../../../../stores";
import { CircularProgress } from "@material-ui/core";
import AppLink from "../../../../components/Link";
import { useTheme } from "@material-ui/core";

function PlaysStats() {
  const { playsStore } = useStore();
  const theme = useTheme();
  var count = 0;
  
  if (playsStore.error) {
    count = <span style={{ color: "red" }}>Error</span>;
  } else if (playsStore.loading) {
    count = <CircularProgress size={15} color="inherit" />;
  } else {
    count = playsStore?.getPlays?.totalDocs || 0;
  }
  return (
    <FancyCard
      cardHeader={
        <FancyCard.CardHeader icon>
          {(headerClasses) => (
            <>
              <FancyCard.CardIcon color="success">
                <VpnKeyIcon style={{fontSize: theme.dashboardIconSize}}/>
              </FancyCard.CardIcon>
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <p className={headerClasses.cardCategory}>Plays</p>
                <h3 className={headerClasses.cardTitle}>{count}</h3>
              </div>
            </>
          )}
        </FancyCard.CardHeader>
      }
    >
      <FancyCard.CardContent>
        <FancyCard.Divider />
        <AppLink to={getRouteNames()["sm_plays"]}>Search new plays</AppLink>
      </FancyCard.CardContent>
    </FancyCard>
  );
}

export default observer(PlaysStats);
