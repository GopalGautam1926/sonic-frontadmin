import React from "react";
import { FormControl, Grid } from "@material-ui/core";
import { useHistory, useLocation, useParams } from "react-router-dom";
import AppButton from "../../../components/AppButton/AppButton";
import DataFetchingStateComponent from "../../../components/common/DataFetchingStateComponent";
import FancyCard from "../../../components/FancyCard/FancyCard";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import { toast } from "react-toastify";
import RSpace from "../../../components/rcomponents/RSpace";
import companyHttps from "../../../services/https/resources/company.https";
import { useStore } from "../../../stores";
import CustomDropDown from "../../../components/AppTextInput/CustomDropDown";
import { CompanyType } from "../../../constants";
import { SwitchWithLabel } from "../../../components/Switch/Switch";
import ChangeCompanyAdmin from "./ChangeCompanyAdmin";

export default function ViewCompany({ closeDialog }) {
  const [state, setState] = React.useState({
    editMode: false,
    loading: true,
    editLoading: false,
    error: null,
    company: {},
    disabled: false,
    deleteLoading: false,
    changeAdminModal: {
      open: false,
    },
  });
  let { companyId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const { companyStore } = useStore();
  const [company, setCompany] = React.useState({});

  const getAndSetCompany = async () => {
    try {
      setState({ ...state, loading: true, error: null });
      if (location?.state?.company) {
        setCompany(location.state.company);
        setState({ ...state, loading: false, company: location.state.company });
      } else {
        const { data } = await companyHttps.findById(companyId);
        setCompany(data);
        setState({ ...state, loading: false, company: data });
      }
    } catch (error) {
      setState({ ...state, loading: false, error: error });
    }
  };

  React.useEffect(() => {
    getAndSetCompany();
  }, [companyId]);

  const onUpdateSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, editLoading: true });

    // if (state?.checkEmail) {
    companyHttps
      .updateCompany(companyId, company)
      .then(({ data }) => {
        setState({
          ...state,
          editLoading: false,
          editMode: false,
          company: data,
        });
        toast.success("Updated successfully");
      })
      .catch((err) => {
        setState({ ...state, editLoading: false });
        toast.error(err.message || "Error while creating..");
      });
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader>
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>Company</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  {companyId || "--"}
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <form onSubmit={onUpdateSubmit}>
          <FancyCard.CardContent>
            <DataFetchingStateComponent
              loading={state.loading}
              error={state.error}
              onClickTryAgain={() => getAndSetCompany()}
            >
              <RSpace justifyContent="flex-end">
                <RSpace.Item>
                  <AppButton
                    onClick={() => {
                      setState({
                        ...state,
                        changeAdminModal: {
                          ...state.changeAdminModal,
                          open: true,
                        },
                      });
                    }}
                    type="button"
                    disabled={state.disabled}
                  >
                    Change company admin
                  </AppButton>
                </RSpace.Item>

                {state.editMode && (
                  <RSpace.Item>
                    <AppButton
                      onClick={() => {
                        setState({ ...state, editMode: false });
                        setCompany(state.company);
                      }}
                      type="button"
                      disabled={state.editLoading}
                    >
                      Cancel
                    </AppButton>
                  </RSpace.Item>
                )}

                {state.editMode && (
                  <RSpace.Item>
                    <AppButton
                      loading={state.editLoading}
                      loadingText="Updating..."
                      type="submit"
                      // onClick={validating}
                    >
                      Update
                    </AppButton>
                  </RSpace.Item>
                )}

                {!state.editMode && (
                  <RSpace.Item>
                    <AppButton
                      onClick={() => {
                        setState({ ...state, editMode: true });
                      }}
                      type="button"
                      disabled={state.disabled}
                    >
                      Edit
                    </AppButton>
                  </RSpace.Item>
                )}
              </RSpace>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth component="fieldset">
                    <AppTextInput
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        readOnly: !state.editMode,
                        disabled: !state.editMode,
                        placeholder: "Name of the company",
                        value: company?.name,
                        required: true,
                        onChange: (e) =>
                          setCompany({ ...company, name: e.target.value }),
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth component="fieldset">
                    <CustomDropDown
                      labelText="Company type"
                      id="companyType"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        readOnly: !state.editMode,
                        disabled: !state.editMode,
                        placeholder: "Company Type",
                        value: company.companyType,
                        required: true,
                        onChange: (e) =>
                          setCompany({
                            ...company,
                            companyType: e.target.value,
                          }),
                      }}
                      data={CompanyType || []}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth component="fieldset">
                    <AppTextInput
                      labelText="Company URN/ID"
                      id="CompanyUrnId"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        readOnly: !state.editMode,
                        disabled: !state.editMode,
                        placeholder: "Company URN/ID",
                        value: company.companyUrnOrId,
                        onChange: (e) =>
                          setCompany({
                            ...company,
                            companyUrnOrId: e.target.value,
                          }),
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth component="fieldset">
                    <AppTextInput
                      labelText="Admin"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        readOnly: true,
                        disabled: true,
                        placeholder: "Admin",
                        value: company?.owner?.username,
                      }}
                      labelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <SwitchWithLabel
                    label={company.enabled ? "Active" : "Inactive"}
                    disabled={!state.editMode}
                    checked={company.enabled}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        enabled: e.target.checked,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </DataFetchingStateComponent>
          </FancyCard.CardContent>
        </form>
      </FancyCard>
      <ChangeCompanyAdmin
        open={state.changeAdminModal?.open}
        closeDialog={() =>
          setState({
            ...state,
            changeAdminModal: { ...state.changeAdminModal, open: false },
          })
        }
        company={company}
      />
    </div>
  );
}
