import { FormControl, Grid } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import cogoToast from "cogo-toast";
import React from "react";
import { useHistory } from "react-router-dom";
import AppButton from "../../../components/AppButton/AppButton";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import FancyCard from "../../../components/FancyCard/FancyCard";
import UserPicker from "../../../components/Picker/UserPicker/UserPicker";
import companyHttps from "../../../services/https/resources/company.https";
import { log } from "../../../utils/app.debug";

export default function ChangeCompanyAdmin({ open, closeDialog, company }) {
  const [state, setState] = React.useState({
    admin: {},
    changeAdmin: {
      loading: false,
      error: null,
      data: "",
    },
  });

  const history = useHistory();

  log("state change", state);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!state?.admin?._id) return cogoToast.warn("Please select an admin");
    setState({
      ...state,
      changeAdmin: { ...state.changeAdmin, loading: true },
    });
    companyHttps
      .changeCompanyAdmin(company?._id, state?.admin?._id)
      .then((res) => {
        log("Change Company Admin Success", res);
        setState({
          ...state,
          changeAdmin: { ...state.changeAdmin, loading: false },
        });
        closeDialog();
        history.push("/admin/company-management/company");
        cogoToast.success("Successfully changed admin");
      })
      .catch((err) => {
        log("Change Company Admin Error", err);
        setState({
          ...state,
          changeAdmin: { ...state.changeAdmin, loading: false },
        });
        cogoToast.error(err?.message);
      });
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader>
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>Company</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  Change company admin
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <form onSubmit={onSubmit}>
          <FancyCard.CardContent>
            <FormControl fullWidth component="fieldset">
              <UserPicker
                labelText="Select Admin"
                placeholder="Search for admin"
                value={state?.admin}
                getSelectedValue={(user) =>
                  setState({
                    ...state,
                    admin: user,
                  })
                }
              />
            </FormControl>
          </FancyCard.CardContent>

          <FancyCard.CardActions>
            <AppButton onClick={() => closeDialog()}>Close</AppButton>
            <AppButton
              type="submit"
              loading={state.changeAdmin.loading}
              loadingText={"Please wait..."}
            >
              Apply
            </AppButton>
          </FancyCard.CardActions>
        </form>
      </FancyCard>
    </Dialog>
  );
}
