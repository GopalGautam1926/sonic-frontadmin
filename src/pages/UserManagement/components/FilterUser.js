import React from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import FancyCard from '../../../components/FancyCard/FancyCard';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import GroupDropDown from '../../GroupManagement/components/GroupDropDown';
import CompanyDropDown from '../../CompanyManagement/components/CompanyDropDown';
import AppButton from '../../../components/AppButton/AppButton';
import { useStore } from '../../../stores';

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
                            <Grid item xs={12} sm={3} md={3}>
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

                            <Grid item xs={12} sm={3} md={3}>
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

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Phone Number"
                                    id="phone"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Phone Number",
                                        value: userStore?.getFilters?.phone,
                                        onChange: (e) => userStore?.changeFilters({ ...userStore?.getFilters, phone: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Sub"
                                    id="sub"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Sub",
                                        value: userStore?.getFilters?.sub,
                                        onChange: (e) => userStore?.changeFilters({ ...userStore?.getFilters, sub: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                                <GroupDropDown
                                    selectedValue="NONE"
                                    labelText="Associated Group"
                                    fullWidth
                                    onChangeGroup={(value) => {
                                        userStore?.changeFilters({ ...userStore?.getFilters, group: value })
                                    }}
                                    value={userStore?.getFilters?.group}
                                />
                            </Grid >

                            <Grid item xs={12} sm={3} md={3}>
                                <CompanyDropDown
                                    labelText="Associated Company"
                                    fullWidth
                                    value={userStore?.getFilters?.company}
                                    onChange={(e) => userStore?.changeFilters({ ...userStore?.getFilters, company: e.target.value })}
                                />
                            </Grid>
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
