import React from 'react';
import BusinessIcon from '@material-ui/icons/Business';
import FancyCard from '../../../components/FancyCard/FancyCard';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../routes/routes.data';
import { useStore } from '../../../stores';
import { CircularProgress } from "@material-ui/core";
import { observer } from 'mobx-react';

export const CompaniesStats = observer(() => {
    const { companyStore } = useStore();

    var count = 0
    if (companyStore.error) {
        count = <span style={{ color: "red" }}>Error</span>;
    } else if (companyStore.loading) {
        count = <CircularProgress size={15} color="inherit" />;
    } else {
        count = companyStore?.getCompany?.docs?.length || 0;
    }
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
                <Link to={getRouteNames()["cm_company"]}>Add new company</Link>
            </FancyCard.CardContent>
        </FancyCard>
    )
})
