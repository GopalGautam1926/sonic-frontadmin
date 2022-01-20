import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import AppButton from "../../../components/AppButton/AppButton";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import FancyCard from "../../../components/FancyCard/FancyCard";
import { SwitchWithLabel } from "../../../components/Switch/Switch";
import usersHttps from "../../../services/https/resources/users.https";
import { toast } from "react-toastify";
import GroupDropDown from "../../../components/AppTextInput/GroupDropDown";
import CompanyDropDown from "../../../components/AppTextInput/CompanyDropDown";

const initialUserDetails = {
  userName: "",
  tempPassword: "",
  email: "",
  phoneNumber: "",
  countryCode: "+44",
  isEmailVerified: true,
  isPhoneNumberVerified: false,
  sendInvitationByEmail: true,
  group: null,
  company: null,
};
export default function RegisterUser({ closeDialog }) {
  const [newUser, setNewUser] = useState(initialUserDetails);
  const [state, setState] = useState({
    loading: false,
    error: null
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    const payload = {
      ...newUser,
      password: newUser.tempPassword
    };
    if (payload.phoneNumber) {
      payload.phoneNumber = `${payload.countryCode}${payload.phoneNumber}`;
    }

    delete payload.countryCode;
    delete payload.tempPassword;
    usersHttps
      .adminCreateUser(payload)
      .then(({ data }) => {
        setState({ ...state, loading: false });
        setNewUser(initialUserDetails);
        toast.success("User created successfully");
        closeDialog?.();
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        toast.error(err.message || "Error while creating user..");
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
                  Register New User
                </h4>
                <p className={headerClasses.cardCategoryWhite}>
                  Add new user in the system
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
                <GroupDropDown
                  labelText="Associated Group"
                  id="associatedGroup"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    placeholder: "Associated Group",
                    value: newUser.group,
                    onChange: (e) =>
                      setNewUser({ ...newUser, group: e.target.value }),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CompanyDropDown
                  labelText="Company Name"
                  id="companyName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    placeholder: "Company Name",
                    value: newUser.company,
                    onChange: (e) =>
                      setNewUser({ ...newUser, company: e.target.value }),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <AppTextInput
                  labelText="Username (Required)"
                  id="username"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    id: "username",
                    placeholder: "Username",
                    value: newUser.userName,
                    onChange: (e) =>
                      setNewUser({ ...newUser, userName: e.target.value }),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <AppTextInput
                  labelText="Email (Required)"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "email",
                    required: true,
                    id: "email",
                    placeholder: "Email",
                    value: newUser.email,
                    onChange: (e) =>
                      setNewUser({ ...newUser, email: e.target.value }),
                  }}
                />
                <SwitchWithLabel
                  label="Mark email as verified? (Required)"
                  checked={newUser.isEmailVerified}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      isEmailVerified: e.target.checked,
                    })
                  }
                />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6}>
                <AppTextInput.AppPhoneNumberInput
                  labelText="Phone number (Optional)"
                  id="phonenumber"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "number",
                    id: "phonenumber",
                    placeholder: "Phone number",
                    value: newUser.phoneNumber,
                    onChange: (e) =>
                      setNewUser({ ...newUser, phoneNumber: e.target.value }),
                  }}
                  onChangePhoneNumber={({ code, number }) => { }}
                  countrySelectProps={{
                    value: newUser.countryCode,
                    onChange: (e) =>
                      setNewUser({ ...newUser, countryCode: e.target.value }),
                  }}
                />
                <SwitchWithLabel
                  label="Mark phone number as verified?"
                  checked={newUser.isPhoneNumberVerified}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      isPhoneNumberVerified: e.target.checked,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <AppTextInput.AppPasswordInput
                  labelText="Temp password (Required)"
                  id="tempPassword"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    id: "tempPassword",
                    placeholder: "",
                    value: newUser.tempPassword,
                    onChange: (e) =>
                      setNewUser({ ...newUser, tempPassword: e.target.value }),
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1} style={{ marginTop: 10 }}>
              <Grid item xs={12} sm={6} md={6}>
                <SwitchWithLabel
                  label="Send an invitation to this new user by email?"
                  checked={newUser.sendInvitationByEmail}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      sendInvitationByEmail: e.target.checked,
                    })
                  }
                />
              </Grid>
            </Grid>
          </FancyCard.CardContent>

          <FancyCard.CardActions>
            <AppButton color="danger" onClick={() => closeDialog?.()}>
              Close
            </AppButton>
            <AppButton
              type="submit"
              loadingText="Creating.."
              loading={state.loading}
            >
              Register
            </AppButton>
          </FancyCard.CardActions>
        </form>
      </FancyCard>
    </div>
  );
}
