import React from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FancyCard from '../../../components/FancyCard/FancyCard';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../routes/routes.data';
import { useStore } from '../../../stores';
import { CircularProgress } from "@material-ui/core";
import { observer } from 'mobx-react';

export const PartnersStats = observer(() => {
    const { partnerStore } = useStore();

    var count = 0
    if (partnerStore.error) {
        count = <span style={{ color: "red" }}>Error</span>;
    } else if (partnerStore.loading) {
        count = <CircularProgress size={15} color="inherit" />;
    } else {
        count = partnerStore?.getPartner?.length || 0;
    }
    return (
        <FancyCard
            cardHeader={
                <FancyCard.CardHeader icon>
                    {(headerClasses) => (
                        <>
                            <FancyCard.CardIcon color="purple">
                                <PersonAddIcon />
                            </FancyCard.CardIcon>
                            <div style={{ marginTop: 10, textAlign: "right" }}>
                                <p className={headerClasses.cardCategory}>Partners</p>
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
                <Link to={getRouteNames()["cm_partner"]}>Add new partner</Link>
            </FancyCard.CardContent>
        </FancyCard>
    )
})
