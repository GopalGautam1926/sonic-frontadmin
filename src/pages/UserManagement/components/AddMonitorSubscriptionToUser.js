import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import AppButton from "../../../components/AppButton/AppButton";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import FancyCard from "../../../components/FancyCard/FancyCard";
import usersHttps from "../../../services/https/resources/users.https";
import { toast } from "react-toastify";
import { log } from "../../../utils/app.debug";

export default function AddMonitorSubscriptionToUser({ closeDialog }) {
  const [state, setState] = useState({
    loading: false,
    userNameOrSub: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    usersHttps
      .addMonitoringSubscriptionToUser(state.userNameOrSub)
      .then(({ data }) => {
        log("add monitor data", data);
        setState({ ...state, loading: false, userNameOrSub: "" });
        toast.success("Added successfully");
        closeDialog?.();
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        toast.error(err.message || "Error while adding..");
      });
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader color="success">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>
                  Add Monitor Subscription To The Existing User
                </h4>
                <p className={headerClasses.cardCategoryWhite}>
                  Add Missing Monitor Subscription To The Existing User
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <form onSubmit={onSubmit}>
          <FancyCard.CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6}>
                <AppTextInput
                  labelText="Username or sub"
                  id="userNameOrSub"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  helperText="Given user must be in one of the monitoring group AIM or AFEM and must have atleast one valid license"
                  inputProps={{
                    required: true,
                    id: "userNameOrSub",
                    placeholder: "Username or sub from cognito",
                    value: state.userNameOrSub,
                    onChange: (e) =>
                      setState({ ...state, userNameOrSub: e.target.value }),
                  }}
                />
              </Grid>
            </Grid>
          </FancyCard.CardContent>

          <FancyCard.CardActions>
            <AppButton
              type="submit"
              loadingText="Adding.."
              loading={state.loading}
            >
              Add Monitoring
            </AppButton>
          </FancyCard.CardActions>
        </form>
      </FancyCard>
    </div>
  );
}
