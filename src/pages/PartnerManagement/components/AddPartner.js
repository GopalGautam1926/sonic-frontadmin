import React from 'react'
import AppButton from '../../../components/AppButton/AppButton'
import FancyCard from '../../../components/FancyCard/FancyCard'
import { Grid, FormControl } from "@material-ui/core";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import { log } from '../../../utils/app.debug';
import partnerHttps from '../../../services/https/resources/partner.https';
import { toast } from "react-toastify";
import { useStore } from '../../../stores';
import UserPicker from '../../../components/UserPicker/UserPicker';

const initialPartner = {
    loading: false,
    partnerData: {
        name: "",
        description: "",
        partnerType:"CMO",
        email: "",
        contactNo: "",
        address: {
            country: "",
            city: "",
            line1: "",
            line2: ""
        },
        owner: ""
    },
    error: null
}

export default function AddPartner({ closeDialog }) {
    const { partnerStore } = useStore()
    const [state, setState] = React.useState(initialPartner);

    const onPartnerSubmit = (e) => {
        e.preventDefault()
        const payload = { ...state.partnerData }
        // if (payload.contactNo) {
        //     payload.contactNo = `${payload.countryCode}${payload.contactNo}`;
        // }
        // delete payload.countryCode

        setState({ ...state, loading: true })
        partnerHttps.createPartner(payload).then(({ data }) => {
            setState({ ...state, loading: false })
            partnerStore.addPartner(data)
            toast.success("Successfully added partner")
            closeDialog?.()
            setState(initialPartner);
            log("Add Partner Data", data)
        }).catch((err) => {
            setState({ ...state, loading: false, error: err?.message })
            toast.error(err?.message || "Error adding partner...")
            log("AddPartner Error", err)
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
                <form onSubmit={onPartnerSubmit}>
                    <FancyCard.CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth component="fieldset" >
                                    <AppTextInput
                                        labelText="Partner name"
                                        id="name"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            id: "name",
                                            required: true,
                                            placeholder: "Partner name",
                                            value: state.partnerData.name,
                                            onChange: (e) =>
                                                setState({
                                                    ...state, partnerData: {
                                                        ...state.partnerData, name: e.target.value
                                                    }
                                                }),
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth component="fieldset" >
                                    <UserPicker
                                        labelText="Owner"
                                        placeholder="Owner username"
                                        getFoundUser={(user) => setState({
                                            ...state, partnerData: {
                                                ...state.partnerData, owner: user?._id
                                            }
                                        })}
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
                                            placeholder: "Email address",
                                            value: state.partnerData.email,
                                            onChange: (e) =>
                                                setState({
                                                    ...state, partnerData: {
                                                        ...state.partnerData, email: e.target.value
                                                    }
                                                }),
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            {/* <Grid item xs={12} sm={6} md={6}>
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
                                            value: state.partnerData.contactNo,
                                            onChange: (e) =>
                                                setState({
                                                    ...state, partnerData: {
                                                        ...state.partnerData, contactNo: e.target.value
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
                            </Grid> */}
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => {
                            setState(initialPartner)
                            closeDialog?.()
                        }}>
                            Close
                        </AppButton>
                        <AppButton type="submit" loadingText="Adding.." loading={state.loading}>Add</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}
