import React from 'react';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import FancyCard from '../../../components/FancyCard/FancyCard';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../routes/routes.data';

export default function SonickeyStats() {
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
                <Link to={getRouteNames()["sm_sonickeys"]}>Add new sonickey</Link>
            </FancyCard.CardContent>
        </FancyCard>
    )
}
