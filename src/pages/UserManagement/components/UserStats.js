import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import FancyCard from '../../../components/FancyCard/FancyCard';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../routes/routes.data';

export default function UserStats() {
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
                                <h3 className={headerClasses.cardTitle}>
                                    {/* {count} */}99
                                </h3>
                            </div>
                        </>
                    )}
                </FancyCard.CardHeader>
            }
        >
            <FancyCard.CardContent>
                <FancyCard.Divider />
                <Link to={getRouteNames()["um_users"]}>Add new user</Link>
            </FancyCard.CardContent>
        </FancyCard>
    )
}
