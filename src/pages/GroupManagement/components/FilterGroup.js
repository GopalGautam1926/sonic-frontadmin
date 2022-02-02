import React from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import FancyCard from '../../../components/FancyCard/FancyCard';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import GroupDropDown from '../../GroupManagement/components/GroupDropDown';
import AppButton from '../../../components/AppButton/AppButton';
import { useStore } from '../../../stores';

function FilterGroup({ closeDialog }) {
    const { groupStore } = useStore();

    const onSubmit = (e) => {
        e.preventDefault();
        groupStore.fetchGroups();
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
                                    Filter by groups
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
                                <GroupDropDown
                                    labelText="Group Name"
                                    fullWidth
                                    value={groupStore?.getFilters?.group}
                                    onChangeGroup={(value) => {
                                        groupStore?.changeFilters({ ...groupStore?.getFilters, group: value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Id"
                                    id="id"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Id",
                                        value: groupStore?.getFilters?.id,
                                        onChange: (e) => groupStore?.changeFilters({ ...groupStore?.getFilters, id: e.target.value })
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton onClick={() => groupStore?.resetFilter()}>Reset</AppButton>
                        <AppButton color='success' type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}

export default observer(FilterGroup);
