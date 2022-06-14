import React from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import FancyCard from '../../../components/FancyCard/FancyCard';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import AppButton from '../../../components/AppButton/AppButton';
import { useStore } from '../../../stores';
import CustomDropDown from '../../../components/AppTextInput/CustomDropDown';
import { PartnerTypes } from '../../../constants';

function FilterPartner({ closeDialog }) {
    const { partnerStore } = useStore();

    const onSubmit = (e) => {
        e.preventDefault();
        partnerStore.fetchPartners();
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
                                    Filter by partners
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
                                    labelText="Partner Name"
                                    id="partnerName"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Partner name",
                                        value: partnerStore?.getFilters?.name,
                                        onChange: (e) => partnerStore?.changeFilters({ ...partnerStore?.getFilters, name: e.target.value })
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Admin"
                                    id="admin"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Admin username",
                                        value: partnerStore?.getFilters?.owner,
                                        onChange: (e) => partnerStore?.changeFilters({ ...partnerStore?.getFilters, owner: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                    <CustomDropDown
                                            labelText="Partner Type"
                                            id="partnerType"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                placeholder: "Partner type",
                                                value: partnerStore?.getFilters?.partnerType,
                                                onChange: (e) =>
                                                    partnerStore?.changeFilters({ ...partnerStore?.getFilters, partnerType: e.target.value }),
                                            }}
                                            data={PartnerTypes || []}
                                    />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Partner Id"
                                    id="id"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Partner id",
                                        value: partnerStore?.getFilters?._id,
                                        onChange: (e) => partnerStore?.changeFilters({ ...partnerStore?.getFilters, _id: e.target.value })
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton onClick={() => partnerStore?.resetFilter()}>Reset</AppButton>
                        <AppButton color='success' type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}

export default observer(FilterPartner);
