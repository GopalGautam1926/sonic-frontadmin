import { Checkbox, FormControlLabel, FormHelperText, Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import React from 'react'
import AppButton from '../../../../components/AppButton/AppButton'
import AppTextInput from '../../../../components/AppTextInput/AppTextInput'
import CountryDropDown from '../../../../components/AppTextInput/CountryDropDown'
import CustomDropDown from '../../../../components/AppTextInput/CustomDropDown'
import RadioDropDown from '../../../../components/AppTextInput/RadioDropDown'
import FancyCard from '../../../../components/FancyCard/FancyCard'
import CompanyPicker from '../../../../components/Picker/CompanyPicker'
import PartnerPicker from '../../../../components/Picker/PartnerPicker'
import { Channel } from '../../../../constants'
import { useStore } from '../../../../stores'
import { useTheme } from '@material-ui/core'

const FilterCompanyReport = ({ closeDialog }) => {
    const theme = useTheme();
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
                        <Grid item xs={12} sm={6} md={3}>
                            <PartnerPicker
                                labelText="Partner"
                                placeholder="Search for partner"
                                value={companyReportStore?.getFilters?.partner}
                                getSelectedValue={(partner) => companyReportStore?.changeFilters({ ...companyReportStore?.getFilters, partner: partner })}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <CompanyPicker
                                labelText="Company"
                                placeholder="Search for company"
                                value={companyReportStore?.getFilters?.company}
                                getSelectedValue={(company) => companyReportStore?.changeFilters({ ...companyReportStore?.getFilters, company: company })}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppTextInput
                                labelText="Track Title"
                                id="track"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    placeholder: "Track Title",
                                    value: companyReportStore.getFilters.track,
                                    onChange: (e) => companyReportStore?.changeFilters({ ...companyReportStore?.getFilters, track: e.target.value })
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppTextInput
                                labelText="Artist"
                                id="artist"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    placeholder: "Artist",
                                    value: companyReportStore?.getFilters?.artist,
                                    onChange: (e) => companyReportStore?.changeFilters({ ...companyReportStore?.getFilters, artist: e.target.value })
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <RadioDropDown
                                labelText="Radio Station"
                                id="radiostation"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    placeholder: "Radio Station",
                                    value: companyReportStore?.getFilters?.radioStation,
                                    onChange: (e) => companyReportStore?.changeFilters({ ...companyReportStore?.getFilters, radioStation: e.target.value })
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <CountryDropDown
                                labelText="Country"
                                id="country"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    placeholder: "Country",
                                    value: companyReportStore?.getFilters?.country,
                                    onChange: (e) => companyReportStore?.changeFilters({ ...companyReportStore?.getFilters, country: e.target.value })
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <CustomDropDown
                                labelText="Channel"
                                id="channel"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    placeholder: "Channel",
                                    value: companyReportStore?.getFilters?.channel,
                                    onChange: (e) => companyReportStore?.changeFilters({ ...companyReportStore?.getFilters, channel: e.target.value })
                                }}
                                data={Channel || []}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppTextInput
                                labelText="Rows Per Page"
                                id="rowsPerPage"
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    // readOnly: license.isUnlimitedMonitor,
                                    type: "number",
                                    min: "0",
                                    placeholder: "eg. 10",
                                    value: companyReportStore.getFilters.rowsPerPage,
                                    onChange: (e) => companyReportStore?.changeFilters({ ...companyReportStore?.getFilters, rowsPerPage: e.target.value })
                                }}
                            />
                            <FormHelperText style={{ marginTop: '-10px' }}>Max. 2000</FormHelperText>
                        </Grid>
                    </Grid>
                    <FormControlLabel
                        style={{color: theme.palette.primary.contrastText}}
                        control={
                            <Checkbox
                                checked={companyReportStore?.getFilters?.isPartnerCustomerCompanyInc}
                                onChange={(e) => companyReportStore?.changeFilters({ ...companyReportStore?.getFilters, isPartnerCustomerCompanyInc: e.target.checked })}
                                color="secondary"
                            />
                        }
                        label="Including Partner Customer Companies"
                    />
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

export default observer(FilterCompanyReport)