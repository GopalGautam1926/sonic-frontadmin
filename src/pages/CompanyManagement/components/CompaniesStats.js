import React from 'react';
import BusinessIcon from '@material-ui/icons/Business';
import FancyCard from '../../../components/FancyCard/FancyCard';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../routes/routes.data';

export default function CompaniesStats() {
    return (
        <FancyCard
            cardHeader={
                <FancyCard.CardHeader icon>
                    {(headerClasses) => (
                        <>
                            <FancyCard.CardIcon color="purple">
                                <BusinessIcon />
                            </FancyCard.CardIcon>
                            <div style={{ marginTop: 10, textAlign: "right" }}>
                                <p className={headerClasses.cardCategory}>Companies</p>
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
                <Link to={getRouteNames()["cm_company"]}>Add new company</Link>
            </FancyCard.CardContent>
        </FancyCard>
    )
}
