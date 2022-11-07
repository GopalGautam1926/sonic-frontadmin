import { FormControl } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import cogoToast from "cogo-toast";
import React from "react";
import { useHistory } from "react-router-dom";
import AppButton from "../../../components/AppButton/AppButton";
import FancyCard from "../../../components/FancyCard/FancyCard";
import UserPicker from "../../../components/Picker/UserPicker/UserPicker";
import partnerHttps from "../../../services/https/resources/partner.https";
import { log } from "../../../utils/app.debug";

export default function ChangePartnerAdmin({ open, closeDialog, partner }) {
  const [state, setState] = React.useState({
    admin: {},
    changeAdmin: {
      loading: false,
      error: null,
      data: "",
    },
  });

  const history = useHistory();

  log("partner", partner);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!state?.admin?._id) return cogoToast.warn("Please select an admin");
    setState({
      ...state,
      changeAdmin: { ...state.changeAdmin, loading: true },
    });
    partnerHttps
      .changePartnerAdmin(partner?._id, state?.admin?._id)
      .then((res) => {
        log("Change Partner Admin Success", res);
        setState({
          ...state,
          changeAdmin: { ...state.changeAdmin, loading: false },
        });
        closeDialog();
        history.push("/admin/partner-management/partner");
        cogoToast.success("Successfully changed admin");
      })
      .catch((err) => {
        log("Change Partner Admin Error", err);
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
                <h4 className={headerClasses.cardTitleWhite}>Partner</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  Change partner admin
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
