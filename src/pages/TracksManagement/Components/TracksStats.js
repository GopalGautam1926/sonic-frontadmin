import React from "react";
import FancyCard from "../../../components/FancyCard/FancyCard";
import { getRouteNames } from "../../../routes/routes.data";
import { useStore } from "../../../stores";
import { CircularProgress } from "@material-ui/core";
import { observer } from "mobx-react";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import AppLink from "../../../components/Link";
import { useTheme } from "@material-ui/core";

const TracksStats = () => {
  const { tracksStore } = useStore();
  const theme = useTheme()
  var count = 0;
  
  if (tracksStore.error) {
    count = <span style={{ color: "red" }}>Error</span>;
  } else if (tracksStore.loading) {
    count = <CircularProgress size={15} color="inherit" />;
  } else {
    count = tracksStore?.tracks?.totalDocs || 0;
  }

  return (
    <FancyCard
      cardHeader={
        <FancyCard.CardHeader icon>
          {(headerClasses) => (
            <>
              <FancyCard.CardIcon color="purple">
                <AudiotrackIcon style={{fontSize: theme.dashboardIconSize}}/>
              </FancyCard.CardIcon>
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <p className={headerClasses.cardCategory}>Tracks</p>
                <h3 className={headerClasses.cardTitle}>{count}</h3>
              </div>
            </>
          )}
        </FancyCard.CardHeader>
      }
    >
      <FancyCard.CardContent>
        <FancyCard.Divider />
        <AppLink to={getRouteNames()["tracks"]}>Search new tracks</AppLink>
      </FancyCard.CardContent>
    </FancyCard>
  );
};

export default observer(TracksStats);
