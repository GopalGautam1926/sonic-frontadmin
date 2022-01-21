import React from 'react';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import FancyCard from '../../../components/FancyCard/FancyCard';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../routes/routes.data';
import { observer } from 'mobx-react';
import { useStore } from '../../../stores';
import { CircularProgress } from '@material-ui/core';

function PlaysStats() {
    const { sonickeyStore } = useStore();

    var count = 0
    if (sonickeyStore.error) {
        count = <span style={{ color: "red" }}>Error</span>;
    } else if (sonickeyStore.loading) {
        count = <CircularProgress size={15} color="inherit" />;
    } else {
        count = sonickeyStore?.getPlays?.totalDocs || 0;
    }
    return (
        <FancyCard
            cardHeader={
                <FancyCard.CardHeader icon>
                    {(headerClasses) => (
                        <>
                            <FancyCard.CardIcon color="purple">
                                <VpnKeyIcon />
                            </FancyCard.CardIcon>
                            <div style={{ marginTop: 10, textAlign: "right" }}>
                                <p className={headerClasses.cardCategory}>SonicKeys</p>
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
                <Link to={getRouteNames()["sm_sonickeys"]}>Search new sonickey</Link>
            </FancyCard.CardContent>
        </FancyCard>
    )
}

export default observer(PlaysStats);
