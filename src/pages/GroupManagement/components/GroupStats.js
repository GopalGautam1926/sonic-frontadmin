import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import FancyCard from '../../../components/FancyCard/FancyCard';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../routes/routes.data';
import { observer } from 'mobx-react';
import { useStore } from '../../../stores';
import { CircularProgress } from '@material-ui/core';

export const GroupStats = observer(() => {
    const { groupStore } = useStore();

    var count = 0
    if (groupStore.error) {
        count = <span style={{ color: "red" }}>Error</span>;
    } else if (groupStore.loading) {
        count = <CircularProgress size={15} color="inherit" />;
    } else {
        count = groupStore?.getGroups?.length || 0;
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
                                <p className={headerClasses.cardCategory}>Groups</p>
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
                <Link to={getRouteNames()["gm_groups"]}>Add new group</Link>
            </FancyCard.CardContent>
        </FancyCard>
    )
})
