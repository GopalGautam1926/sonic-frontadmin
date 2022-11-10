import React from "react";
import { Grid } from "@material-ui/core";
import { observer } from "mobx-react";
import FancyCard from "../../../components/FancyCard/FancyCard";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import AppButton from "../../../components/AppButton/AppButton";
import { useStore } from "../../../stores";
import CustomDropDown from "../../../components/AppTextInput/CustomDropDown";
import { CompanyType } from "../../../constants";
import PartnerPicker from "../../../components/Picker/PartnerPicker";

function FilterCompany({ closeDialog }) {
  const { companyStore } = useStore();

  const onSubmit = (e) => {
    e.preventDefault();
    companyStore.fetchCompanies();
    closeDialog();
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader>
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>Filter</h4>
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
                <AppTextInput
                  labelText="Company Name"
                  id="companyname"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    placeholder: "Company name",
                    value: companyStore?.getFilters?.name,
                    onChange: (e) =>
                      companyStore?.changeFilters({
                        ...companyStore?.getFilters,
                        name: e.target.value,
                      }),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <AppTextInput
                  labelText="Admin"
                  id="Admin"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    placeholder: "Admin username",
                    value: companyStore?.getFilters?.owner,
                    onChange: (e) =>
                      companyStore?.changeFilters({
                        ...companyStore?.getFilters,
                        owner: e.target.value,
                      }),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={3} md={3}>
                <CustomDropDown
                  labelText="Company Type"
                  id="companyType"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    placeholder: "Company type",
                    value: companyStore?.getFilters?.companyType,
                    onChange: (e) =>
                      companyStore?.changeFilters({
                        ...companyStore?.getFilters,
                        companyType: e.target.value,
                      }),
                  }}
                  data={CompanyType || []}
                />
              </Grid>

              <Grid item xs={12} sm={3} md={3}>
                <AppTextInput
                  labelText="Company URN/ID"
                  id="companyUrnOrId"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    placeholder: "Company URN/Id",
                    value: companyStore?.getFilters?.companyUrnOrId,
                    onChange: (e) =>
                      companyStore?.changeFilters({
                        ...companyStore?.getFilters,
                        companyUrnOrId: e.target.value,
                      }),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={3} md={3}>
                <PartnerPicker
                  labelText="Partner"
                  value={companyStore?.getFilters?.partner}
                  placeholder="Search for partner"
                  getSelectedValue={(user) =>
                    companyStore?.changeFilters({
                      ...companyStore?.getFilters,
                      partner: user,
                    })
                  }
                />
              </Grid>
            </Grid>
          </FancyCard.CardContent>

          <FancyCard.CardActions>
            <AppButton onClick={() => closeDialog?.()}>Close</AppButton>
            <AppButton onClick={() => companyStore?.resetFilter()}>
              Reset
            </AppButton>
            <AppButton type="submit">Apply</AppButton>
          </FancyCard.CardActions>
        </form>
      </FancyCard>
    </div>
  );
}

export default observer(FilterCompany);
