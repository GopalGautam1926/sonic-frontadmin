import React from 'react'
import { Grid } from '@material-ui/core'
import FancyCard from '../../../../components/FancyCard/FancyCard'
import AppTextInput from '../../../../components/AppTextInput/AppTextInput'
import AppButton from '../../../../components/AppButton/AppButton'
import { useStore } from '../../../../stores'
import CompanyDropDown from '../../../CompanyManagement/components/CompanyDropDown'
import GroupDropDown from '../../../GroupManagement/components/GroupDropDown'
import { observer } from 'mobx-react'

function FilterEncoded({ closeDialog }) {

    const { sonickeyStore } = useStore();

    const onSubmit = (e) => {
        e.preventDefault();
        sonickeyStore.changeSonicKeyTablePage(1)
        sonickeyStore.fetchSonicKeys()
        closeDialog();
    }

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="purple">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>
                                    Filter
                                </h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    Filter by encoded sonickeys
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <form onSubmit={onSubmit}>
                    <FancyCard.CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="SonicKey"
                                    id="sonickey"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "SonicKey",
                                        value: sonickeyStore?.getFilters?.sonickey,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, sonickey: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Artist"
                                    id="artist"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Artist",
                                        value: sonickeyStore?.getFilters?.artist,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, artist: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Track"
                                    id="track"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Track",
                                        value: sonickeyStore?.getFilters?.track,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, track: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Label"
                                    id="label"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Label",
                                        value: sonickeyStore?.getFilters?.label,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, label: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Distributor"
                                    id="distributor"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Distributor",
                                        value: sonickeyStore?.getFilters?.distributor,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, distributor: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <GroupDropDown
                                    selectedValue="NONE"
                                    labelText="Associated Group"
                                    fullWidth
                                    onChangeGroup={(value) => {
                                        sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, groupName: value })
                                    }}
                                    value={sonickeyStore?.getFilters?.groupName}
                                />
                            </Grid >

                            <Grid item xs={12} sm={3} md={3}>
                                <CompanyDropDown
                                    labelText="Associated Company"
                                    fullWidth
                                    value={sonickeyStore?.getFilters?.companyName}
                                    onChange={(e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, companyName: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Username"
                                    id="username"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Username",
                                        value: sonickeyStore?.getFilters?.username,
                                        onChange: (e) => sonickeyStore?.changeFilters({ ...sonickeyStore?.getFilters, username: e.target.value })
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton onClick={() => sonickeyStore?.resetFilter()}>Reset</AppButton>
                        <AppButton color='success' type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}

export default observer(FilterEncoded);
