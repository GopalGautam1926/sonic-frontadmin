import React from 'react'
import DataFetchingStateComponent from '../../components/common/DataFetchingStateComponent';
import FancyCard from '../../components/FancyCard/FancyCard';
import Table from '../../components/Table/Table';
import { useStore } from '../../stores'
import FilterPlays from './components/FilterPlays';

export default function Plays() {
    const [values, setValues] = React.useState({
        // openPlayingModal: false,
    })
    const { sonickeyStore } = useStore();

    const columns = [
        {
            label: "SonicKey",
            name: "sonickey",
        },
        {
            label: "Radio Station",
            name: "radiostation",
        },
        {
            label: "Date",
            name: "date",
        },
        {
            label: "Time",
            name: "time",
        },
        {
            label: "Duration",
            name: "duration",
        },
        {
            label: "Original Filename",
            name: "name",
        },
        {
            label: "Artist",
            name: "artist",
        },
        {
            label: "Country",
            name: "country",
        }
    ];

    const data = [
        ["sgMMPCeNWxa", "ArBa", "17/01/2022", "05:53", "05:00", "PUTHAM PUTHU _ DALAPATHI.mp3", "ILAYARAJA", "UK"],
        ["sgMMPCeNWxa", "ArBa", "17/01/2022", "04:53", "05:00", "PUTHAM PUTHU _ DALAPATHI.mp3", "ILAYARAJA", "UK"]
    ]

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="success">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Plays</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    List of all plays
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <FancyCard.CardContent>
                    <DataFetchingStateComponent
                    // loading={licenseKeyStore.loading}
                    // error={licenseKeyStore.error}
                    // onClickTryAgain={() => licenseKeyStore.fetchLicenseKeys()}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    refreshButtonProps={{
                                        onClick: () => { },
                                    }}
                                    componentInsideDialog={<FilterPlays />}
                                />
                            }
                            data={data}
                            columns={columns}
                        //   options={{
                        //     count:licenseKeyStore.getLicenseKeys.totalDocs
                        //   }}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    )
}
