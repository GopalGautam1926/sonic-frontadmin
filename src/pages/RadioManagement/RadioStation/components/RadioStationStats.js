import React from "react";
import FancyCard from "../../../../components/FancyCard/FancyCard";
import RadioIcon from "@material-ui/icons/Radio";
import { getRouteNames } from "../../../../routes/routes.data";
import { useStore } from "../../../../stores";
import { observer } from "mobx-react";
import { CircularProgress } from "@material-ui/core";
import AppLink from "../../../../components/Link";
import { useTheme } from "@material-ui/core";

export const RadioStationStats = observer(() => {
  const { radioStationStore } = useStore();
  const theme = useTheme();

  var count = 0;
  if (radioStationStore.error) {
    count = <span style={{ color: "red" }}>Error</span>;
  } else if (radioStationStore.loading) {
    count = <CircularProgress size={15} color="inherit" />;
  } else {
    count = radioStationStore.getRadioStations?.totalDocs || 0;
  }
  return (
    <FancyCard
      cardHeader={
        <FancyCard.CardHeader icon>
          {(headerClasses) => (
            <>
              <FancyCard.CardIcon color="purple">
                <RadioIcon style={{fontSize: theme.dashboardIconSize}} />
              </FancyCard.CardIcon>
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <p className={headerClasses.cardCategory}>Radio Stations</p>
                <h3 className={headerClasses.cardTitle}>{count}</h3>
              </div>
            </>
          )}
        </FancyCard.CardHeader>
      }
    >
      <FancyCard.CardContent>
        <FancyCard.Divider />
        <AppLink to={getRouteNames()["radio_station"]}>
          Add new radio station
        </AppLink>
      </FancyCard.CardContent>
    </FancyCard>
  );
});
