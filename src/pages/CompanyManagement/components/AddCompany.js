import React from 'react'
import AppButton from '../../../components/AppButton/AppButton'
import FancyCard from '../../../components/FancyCard/FancyCard'
import { Grid, FormControl } from "@material-ui/core";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import { log } from '../../../utils/app.debug';
import companyHttps from '../../../services/https/resources/company.https';
import { toast } from "react-toastify";
import { useStore } from '../../../stores';
import UserPicker from '../../../components/UserPicker/UserPicker';

export default function AddCompany({ closeDialog }) {
    const { companyStore, userStore } = useStore()

    const [state, setState] = React.useState({
        loading: false,
        companyData: {
            name: "",
            description: "",
            email: "",
            contactNo: "",
            countryCode: "+44",
            address: {
                country: "",
                city: "",
                line1: "",
                line2: ""
            },
            owner: ""
        },
        error: null
    });

    const onCompanySubmit = (e) => {
        e.preventDefault()
        const payload = { ...state.companyData }
        if (payload.contactNo) {
            payload.contactNo = `${payload.countryCode}${payload.contactNo}`;
        }
        delete payload.countryCode

        setState({ ...state, loading: true })
        companyHttps.createCompany(payload).then(({ data }) => {
            setState({ ...state, loading: false })
            companyStore.addCompany(data)
            toast.success("Successfully added company")
            closeDialog?.()
            log("AddCompany Data", data)
        }).catch((err) => {
            setState({ ...state, loading: false, error: err?.message })
            toast.error(err?.message || "Error adding company...")
            log("AddCompany Error", err)
        })
    }

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="purple">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>
                                    Add New Company
                                </h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    Add new company
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <form onSubmit={onCompanySubmit}>
                    <FancyCard.CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth component="fieldset" >
                                    <AppTextInput
                                        labelText="Company name"
                                        id="name"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            id: "name",
                                            required: true,
                                            value: state.companyData.name,
                                            onChange: (e) =>
                                                setState({
                                                    ...state, companyData: {
                                                        ...state.companyData, name: e.target.value
                                                    }
                                                }),
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth component="fieldset" >
                                    <AppTextInput
                                        labelText="Owner ID"
                                        id="id"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            id: "id",
                                            required: true,
                                            value: state.companyData.owner,
                                            onChange: (e) =>
                                                setState({
                                                    ...state, companyData: {
                                                        ...state.companyData, owner: e.target.value
                                                    }
                                                }),
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth component="fieldset" >
                                    <AppTextInput
                                        labelText="Email"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "email",
                                            required: true,
                                            id: "email",
                                            placeholder: "Email",
                                            value: state.companyData.email,
                                            onChange: (e) =>
                                                setState({
                                                    ...state, companyData: {
                                                        ...state.companyData, email: e.target.value
                                                    }
                                                }),
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth component="fieldset" >
                                    <AppTextInput.AppPhoneNumberInput
                                        labelText="Phone number"
                                        id="phonenumber"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "number",
                                            id: "phonenumber",
                                            placeholder: "Phone number",
                                            value: state.companyData.contactNo,
                                            onChange: (e) =>
                                                setState({
                                                    ...state, companyData: {
                                                        ...state.companyData, contactNo: e.target.value
                                                    }
                                                }),
                                        }}
                                        countrySelectProps={{
                                            value: state.companyData.countryCode,
                                            onChange: (e) =>
                                                setState({
                                                    ...state, companyData: {
                                                        ...state.companyData, countryCode: e.target.value
                                                    }
                                                }),
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth component="fieldset" >
                                    <UserPicker
                                        labelText="Users"
                                        options={userStore?.getUsers?.docs}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton type="submit" loadingText="Adding.." loading={state.loading}>Add</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}
