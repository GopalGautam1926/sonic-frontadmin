import React from "react";
import FancyCard from "../../../../components/FancyCard/FancyCard";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { getRouteNames } from "../../../../routes/routes.data";
import { Link } from "react-router-dom";
import { useStore } from "../../../../stores";
import { observer } from "mobx-react";
import { CircularProgress } from '@material-ui/core';

function ApiKeyStats() {
  const { apiKeyStore } = useStore();
  var count=0
  if (apiKeyStore.error) {
    count= <span style={{ color: "red" }}>Error</span>;
  }else if (apiKeyStore.loading) {
    count= <CircularProgress size={15} color="inherit" />;
  }else{
    count= apiKeyStore.getApiKeys?.totalDocs || 0;
  }
  return (
    <FancyCard
      cardHeader={
        <FancyCard.CardHeader icon>
          {(headerClasses) => (
            <>
              <FancyCard.CardIcon color="success">
                <VpnKeyIcon />
              </FancyCard.CardIcon>
              <div style={{ marginTop: 10, textAlign: "right" }}>
                <p className={headerClasses.cardCategory}>Api Keys</p>
                <h3 className={headerClasses.cardTitle}>
                  {count}
                </h3>
              </div>
            </>
          )}
        </FancyCard.CardHeader>
      }
    >
      <FancyCard.CardContent>
        <FancyCard.Divider />
        <Link to={getRouteNames()["km_apikeys"]}>Add new key</Link>
      </FancyCard.CardContent>
    </FancyCard>
  );
}

export default observer(ApiKeyStats);
