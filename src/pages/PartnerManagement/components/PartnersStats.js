import React from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FancyCard from "../../../components/FancyCard/FancyCard";
import { getRouteNames } from "../../../routes/routes.data";
import { useStore } from "../../../stores";
import { CircularProgress } from "@material-ui/core";
import { observer } from "mobx-react";
import AppLink from "../../../components/Link";
import { useTheme } from "@material-ui/core";

export const PartnersStats = observer(() => {
  const { partnerStore } = useStore();
  const theme = useTheme();

  console.log({theme});

  var count = 0;
  if (partnerStore.error) {
    count = <span style={{ color: "red" }}>Error</span>;
  } else if (partnerStore.loading) {
    count = <CircularProgress size={15} color="inherit" />;
  } else {
    count = partnerStore?.getPartner?.docs?.length || 0;
  }
  return (
    <FancyCard
      cardHeader={
        <FancyCard.CardHeader icon>
          {(headerClasses) => (
            <>
              <FancyCard.CardIcon color="success">
                <PersonAddIcon style={{fontSize: theme.dashboardIconSize}} />
              </FancyCard.CardIcon>
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <p className={headerClasses.cardCategory}>Partners</p>
                <h3 className={headerClasses.cardTitle}>{count}</h3>
              </div>
            </>
          )}
        </FancyCard.CardHeader>
      }
    >
      <FancyCard.CardContent>
        <FancyCard.Divider />
        <AppLink to={getRouteNames()["cm_partner"]}>Add new partner</AppLink>
      </FancyCard.CardContent>
    </FancyCard>
  );
});
