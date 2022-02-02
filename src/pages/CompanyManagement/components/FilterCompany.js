import React from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import FancyCard from '../../../components/FancyCard/FancyCard';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import CompanyDropDown from '../../CompanyManagement/components/CompanyDropDown';
import AppButton from '../../../components/AppButton/AppButton';
import { useStore } from '../../../stores';

function FilterCompany({ closeDialog }) {
    const { companyStore } = useStore();

    const onSubmit = (e) => {
        e.preventDefault();
        companyStore.fetchCompanies();
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
                                    Filter by companies
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
                                <CompanyDropDown
                                    labelText="Company Name"
                                    fullWidth
                                    value={companyStore?.getFilters?.company}
                                    onChange={(e) => companyStore?.changeFilters({ ...companyStore?.getFilters, company: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                <AppTextInput
                                    labelText="Owner"
                                    id="owner"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Owner",
                                        value: companyStore?.getFilters?.owner,
                                        onChange: (e) => companyStore?.changeFilters({ ...companyStore?.getFilters, owner: e.target.value })
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
                                        value: companyStore?.getFilters?.email,
                                        onChange: (e) => companyStore?.changeFilters({ ...companyStore?.getFilters, email: e.target.value })
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
                                        value: companyStore?.getFilters?.phone,
                                        onChange: (e) => companyStore?.changeFilters({ ...companyStore?.getFilters, phone: e.target.value })
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton onClick={() => companyStore?.resetFilter()}>Reset</AppButton>
                        <AppButton color='success' type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}

export default observer(FilterCompany);
