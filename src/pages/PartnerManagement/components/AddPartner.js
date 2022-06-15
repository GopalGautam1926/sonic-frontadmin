import React from 'react'
import AppButton from '../../../components/AppButton/AppButton'
import FancyCard from '../../../components/FancyCard/FancyCard'
import { Grid, FormControl } from "@material-ui/core";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import { log } from '../../../utils/app.debug';
import partnerHttps from '../../../services/https/resources/partner.https';
import { toast } from "react-toastify";
import { useStore } from '../../../stores';
import UserPicker from '../../../components/Picker/UserPicker/UserPicker';
import CustomDropDown from '../../../components/AppTextInput/CustomDropDown';
import { PartnerTypes } from '../../../constants';

const initialPartner = {
    loading: false,
    partnerData: {
        name: "",
        description: "",
        partnerType: "",
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

        setState({ ...state, loading: true })
        partnerHttps.createPartner(payload).then(({ data }) => {
            log("success adding partner", data)
            setState({ ...state, loading: false })
            setState(initialPartner);
            partnerStore.addPartner(data)
            toast.success("Successfully added partner")
            closeDialog?.()
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
                                    Add New Partner
                                </h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    Add new Partner
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
                                        labelText="Admin"
                                        placeholder="Admin username"
                                        getSelectedValue={(user) => setState({
                                            ...state, partnerData: {
                                                ...state.partnerData, owner: user?._id
                                            }
                                        })}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth component="fieldset" >
                                    <CustomDropDown
                                        labelText="Partner type"
                                        id="partnerType"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "partnerType",
                                            required: true,
                                            id: "partnerType",
                                            placeholder: "Partner Type",
                                            value: state.partnerData.partnerType,
                                            onChange: (e) =>
                                                setState({
                                                    ...state, partnerData: {
                                                        ...state.partnerData, partnerType: e.target.value
                                                    }
                                                }),
                                        }}
                                        data={PartnerTypes || []}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth component="fieldset" >
                                    <AppTextInput
                                        labelText="Partner Email"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            id: "email",
                                            required: true,
                                            placeholder: "Partner email",
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
