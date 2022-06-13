import React from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import FancyCard from '../../../components/FancyCard/FancyCard';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import AppButton from '../../../components/AppButton/AppButton';
import { useStore } from '../../../stores';
import CustomDropDown from '../../../components/AppTextInput/CustomDropDown';
import { AssociatedRoles, Status } from '../../../constants';
import CompanyPicker from '../../../components/Picker/CompanyPicker';
import PartnerPicker from '../../../components/Picker/PartnerPicker';

function FilterUser({ closeDialog }) {
    const { userStore } = useStore();

    const onSubmit = (e) => {
        e.preventDefault();
        userStore.fetchUsers();
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
                                    Filter by users
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <form onSubmit={onSubmit}>
                    <FancyCard.CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} md={3}>
                                <AppTextInput
                                    labelText="Id"
                                    id="sub"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Id",
                                        value: userStore?.getFilters?.sub,
                                        onChange: (e) => userStore?.changeFilters({ ...userStore?.getFilters, sub: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AppTextInput
                                    labelText="Username"
                                    id="username"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Username",
                                        value: userStore?.getFilters?.username,
                                        onChange: (e) => userStore?.changeFilters({ ...userStore?.getFilters, username: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AppTextInput
                                    labelText="Email Address"
                                    id="email"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Email Address",
                                        value: userStore?.getFilters?.email,
                                        onChange: (e) => userStore?.changeFilters({ ...userStore?.getFilters, email: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <CustomDropDown
                                    labelText="Associated Role"
                                    id="associated-role"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Associated Role",
                                        value: userStore?.getFilters?.associatedRole,
                                        onChange: (e) => userStore?.changeFilters({ ...userStore?.getFilters, associatedRole: e.target.value })
                                    }}
                                    data={AssociatedRoles || []}
                                />
                            </Grid >

                            <Grid item xs={12} sm={6} md={3}>
                                <PartnerPicker
                                    labelText="Associated Partner"
                                    placeholder="Search for partner"
                                    getSelectedValue={(user) => userStore?.changeFilters({ ...userStore?.getFilters, partner: user })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <CompanyPicker
                                    labelText="Associated Company"
                                    placeholder="Search for company"
                                    getSelectedValue={(user) => userStore?.changeFilters({ ...userStore?.getFilters, company: user })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <CustomDropDown
                                    labelText="Status"
                                    id="status"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Status",
                                        value: userStore?.getFilters?.status,
                                        onChange: (e) => userStore?.changeFilters({ ...userStore?.getFilters, status: e.target.value })
                                    }}
                                    data={Status || []}
                                />
                            </Grid >
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton onClick={() => userStore?.resetFilter()}>Reset</AppButton>
                        <AppButton color='success' type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}

export default observer(FilterUser);
