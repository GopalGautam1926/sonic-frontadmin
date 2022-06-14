import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import FancyCard from '../../../components/FancyCard/FancyCard';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../routes/routes.data';
import { useStore } from '../../../stores';
import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react';

export const TracksStats = observer(() => {
    const { tracksStore } = useStore()

    var count = 0
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
                            <FancyCard.CardIcon color="success">
                                <PeopleIcon />
                            </FancyCard.CardIcon>
                            <div style={{ marginTop: 10, textAlign: "right" }}>
                                <p className={headerClasses.cardCategory}>Tracks</p>
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
                <Link to={getRouteNames()["um_users"]}>Search new tracks</Link>
            </FancyCard.CardContent>
        </FancyCard>
    )
})
