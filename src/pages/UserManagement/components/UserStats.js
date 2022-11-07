import React from "react";
import PeopleIcon from "@material-ui/icons/People";
import FancyCard from "../../../components/FancyCard/FancyCard";
import { getRouteNames } from "../../../routes/routes.data";
import { useStore } from "../../../stores";
import { CircularProgress } from "@material-ui/core";
import { observer } from "mobx-react";
import AppLink from "../../../components/Link";

export const UserStats = observer(() => {
  const { userStore } = useStore();

  var count = 0;
  if (userStore.error) {
    count = <span style={{ color: "red" }}>Error</span>;
  } else if (userStore.loading) {
    count = <CircularProgress size={15} color="inherit" />;
  } else {
    count = userStore.getUsers?.totalDocs || 0;
  }

  return (
    <FancyCard
      cardHeader={
        <FancyCard.CardHeader icon>
          {(headerClasses) => (
            <>
              <FancyCard.CardIcon color="success">
                <PeopleIcon />
              </FancyCard.CardIcon>
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <p className={headerClasses.cardCategory}>Users</p>
                <h3 className={headerClasses.cardTitle}>{count}</h3>
              </div>
            </>
          )}
        </FancyCard.CardHeader>
      }
    >
      <FancyCard.CardContent>
        <FancyCard.Divider />
        <AppLink to={getRouteNames()["um_users"]}>Add new user</AppLink>
      </FancyCard.CardContent>
    </FancyCard>
  );
});
