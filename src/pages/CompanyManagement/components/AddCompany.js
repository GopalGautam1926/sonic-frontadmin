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
import usersHttps from '../../../services/https/resources/users.https';
import CustomDropDown from '../../../components/AppTextInput/CustomDropDown';
import { CompanyType } from '../../../constants';

const initialCompany = {
    loading: false,
    companyData: {
        name: "",
        description: "",
        companyType: "",
        _id: "",
        owner: {
            username: "",
        },
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

export default function AddCompany({ closeDialog }) {
    const { companyStore } = useStore()
    const [state, setState] = React.useState(initialCompany);

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
            setState(initialCompany);
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
                                            placeholder: "Company name",
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
                                    <UserPicker
                                        labelText="Owner"
                                        placeholder="Owner username"
                                        getFoundUser={(user) => setState({
                                            ...state, companyData: {
                                                ...state.companyData, owner: user?._id
                                            }
                                        })}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth component="fieldset" >
                                <CustomDropDown
                                            labelText="Company type"
                                            id="companyType"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                type: "companyType",
                                                required: true,
                                                id: "companyType",
                                                placeholder: "Company Type",
                                                value: state.companyData.companyType,
                                                onChange: (e) =>
                                                setState({
                                                    ...state, companyData: {
                                                        ...state.companyData, companyType: e.target.value
                                                    }
                                                }),
                                            }}
                                            data={CompanyType || []}
                                        />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth component="fieldset" >
                                <AppTextInput
                                        labelText="Company URN/ID"
                                        id="companyUrnId"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            id: "companyUrnId",
                                            required: true,
                                            placeholder: "Company URN/ID",
                                            value: state.companyData._id,
                                            onChange: (e) =>
                                                setState({
                                                    ...state, companyData: {
                                                        ...state.companyData, _id: e.target.value
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
                            setState(initialCompany)
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
