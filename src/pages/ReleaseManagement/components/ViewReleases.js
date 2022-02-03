import React from 'react'
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent'
import FancyCard from '../../../components/FancyCard/FancyCard'
import Table from '../../../components/Table/Table'
import { useStore } from '../../../stores'
import { log } from '../../../utils/app.debug'
import UploadVersion from './UploadVersion'
import AppButton from '../../../components/AppButton/AppButton'


export default function Release() {
    const { releaseStore } = useStore()
    const platform = 'Apple';
    const columns = [
        {
            label: "Version Code",
            name: "versionCode",
        },
        {
            label: "Release Note",
            name: "releaseNote",
        },
        {
            label: "Download Link",
            name: "contentVersionFilePath",
        },
        {
            label: "Actions",
            name: "key",
        }
    ]
    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="success">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Releases</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    All releases
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <FancyCard.CardContent>
                    <DataFetchingStateComponent
                        loading={releaseStore.loading}
                        error={releaseStore.error}
                        onClickTryAgain={() => releaseStore.fetchVersions(platform)}
                    >
                        <Table
                            title={
                                <Table.TableActions
                                    refreshButtonProps={{
                                        onClick: () => { releaseStore.fetchVersions(platform) },
                                    
                                    }}
                                    componentInsideDialog={<UploadVersion/>}
                                />

                            }
                            data={releaseStore.getVersions || []}
                            columns={columns}
                            options={{
                                count: releaseStore.getVersions?.length
                            }}
                        />
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    )
}
