import { Grid } from '@material-ui/core'
import React from 'react'
import AppButton from '../../../../components/AppButton/AppButton'
import AppTextInput from '../../../../components/AppTextInput/AppTextInput'
import FancyCard from '../../../../components/FancyCard/FancyCard'
import { useStore } from '../../../../stores'

export default function FilterCompanyReport({ closeDialog }) {
    const { companyReportStore } = useStore();

    const onCompanyReportSubmit = (e) => {
        e.preventDefault();
        companyReportStore.fetchCompaniesReports()
    }
    return (
        <FancyCard
            cardHeader={
                <FancyCard.CardHeader color="purple">
                    {(headerClasses) => (
                        <>
                            <h4 className={headerClasses.cardTitleWhite}>
                                Filter
                            </h4>
                            <p className={headerClasses.cardCategoryWhite}>
                                Filter by companies report
                            </p>
                        </>
                    )}
                </FancyCard.CardHeader>
            }
        >
            <form onSubmit={onCompanyReportSubmit}>
                <FancyCard.CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={3} md={3}>
                            <AppTextInput
                                labelText="Company Name"
                                id="companyname"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    placeholder: "Company name",
                                    value: companyReportStore?.getFilters?.companyName,
                                    onChange: (e) => companyReportStore?.changeFilters({ ...companyReportStore?.getFilters, companyName: e.target.value })
                                }}
                            />
                        </Grid>
                    </Grid>
                </FancyCard.CardContent>

                <FancyCard.CardActions>
                    <AppButton color="danger" onClick={() => closeDialog?.()}>
                        Close
                    </AppButton>
                    <AppButton onClick={() => companyReportStore?.resetFilter()}>Reset</AppButton>
                    <AppButton color='success' type="submit">Apply</AppButton>
                </FancyCard.CardActions>
            </form>
        </FancyCard>
    )
}
