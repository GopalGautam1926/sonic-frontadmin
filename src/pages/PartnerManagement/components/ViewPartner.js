import React from 'react';
import { FormControl, Grid } from '@material-ui/core';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AppButton from '../../../components/AppButton/AppButton';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import FancyCard from '../../../components/FancyCard/FancyCard';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import { toast } from 'react-toastify';
import RSpace from '../../../components/rcomponents/RSpace';
import companyHttps from '../../../services/https/resources/company.https';
import { getRouteNames } from '../../../routes/routes.data';
import RPopconfirm from '../../../components/rcomponents/RPopconfirm';
import { useStore } from '../../../stores';
import partnerHttps from '../../../services/https/resources/partner.https';
import { CompanyType, PartnerTypes } from '../../../constants';
import CustomDropDown from '../../../components/AppTextInput/CustomDropDown';
import { SwitchWithLabel } from '../../../components/Switch/Switch';

export default function ViewPartner({ closeDialog }) {
    const [state, setState] = React.useState({
        editMode: false,
        loading: true,
        editLoading: false,
        error: null,
        partner: {},
        disabled: false,
        deleteLoading: false,
        checkEmail: false,
    });
    let { partnerId } = useParams();
    const location = useLocation();
    const history = useHistory();
    const { partnerStore } = useStore();
    const [partner, setPartner] = React.useState({
        name: "",
        description: "",
        partnerType:"",
        email: "",
        contactNo: "",
        owner: {
            username: "",
        },
        address: {
            country: "",
            city: "",
            line1: "",
            line2: ""
        },
        owner: "",
        enabled: true,
        suspended: false,
    });

    const getAndSetPartner = async () => {
        try {
            setState({ ...state, loading: true, error: null });
            if (location?.state?.partner) {
                setPartner(location.state.partner);
                setState({ ...state, loading: false, partner: location.state.partner });
            } else {
                const { data } = await partnerHttps.findById(partnerId);
                setPartner(data);
                setState({ ...state, loading: false, partner: data });
            }
        } catch (error) {
            setState({ ...state, loading: false, error: error });
        }
    }

    React.useEffect(() => {
        getAndSetPartner();
    }, [partnerId])

    const onUpdateSubmit = (e) => {
        e.preventDefault();
        setState({ ...state, editLoading: true });

        if (state?.checkEmail) {
            partnerHttps
                .updatePartner(partner._id, partner)
                .then(({ data }) => {
                    setState({
                        ...state,
                        editLoading: false,
                        editMode: false,
                        partner: data,
                    });
                    toast.success("Updated successfully");
                })
                .catch((err) => {
                    setState({ ...state, editLoading: false });
                    toast.error(err.message || "Error while creating..");
                });
        } else {
            setState({ ...state, editLoading: false });
        }
    };

    // const onRemovePartner = () => {
    //     setState({ ...state, disabled: true, deleteLoading: true });
    //     companyHttps.deleteCompany(company?._id).then(({ data }) => {
    //         setState({ ...state, disabled: false, deleteLoading: false })
    //         companyStore.removeCompany(data);
    //         toast.success("Deleted");
    //         history.push({
    //             pathname: `${getRouteNames()["cm_company"]}`
    //         })
    //     }).catch((error) => {
    //         setState({ ...state, disabled: false, deleteLoading: false, error: error?.message })
    //         toast.error(error?.message || "Error removing company...")
    //     })
    // }

    const validating = () => {
        let Emailverification = (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(partner?.email));
        if (Emailverification === false) {
            toast.error("Not valid Email..");
            setState({ ...state, checkEmail: false });
        } else {
            setState({ ...state, checkEmail: true });
        }
    }

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="purple">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>Partner</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    {partnerId || "--"}
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
                            onClickTryAgain={() => getAndSetPartner()}
                        >
                            <RSpace justifyContent="flex-end">
                                {state.editMode && (
                                    <RSpace.Item>
                                        <AppButton
                                            onClick={() => {
                                                setState({ ...state, editMode: false });
                                                setPartner(state.partner);
                                            }}
                                            type="button"
                                            color="warning"
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
                                            onClick={validating}
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
                                {/* <RSpace.Item>
                                    <RPopconfirm
                                        anchorElement={
                                            <AppButton
                                                asIconButton={false}
                                                color="danger"
                                                type="button"
                                                loading={state.disabled}
                                                loadingText="Deleting.."
                                            >
                                                Delete
                                            </AppButton>
                                        }
                                        onClickYes={onRemoveCompany}
                                        message="Really want to remove this company?"
                                    />
                                </RSpace.Item> */}
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
                                                placeholder: "Name of the partner",
                                                value: partner.name,
                                                required: true,
                                                onChange: (e) =>
                                                    setPartner({ ...partner, name: e.target.value }),
                                            }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth component="fieldset">
                                        <CustomDropDown
                                            labelText="Partner type"
                                            id="partnerType"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                readOnly: !state.editMode,
                                                disabled: !state.editMode,
                                                placeholder: "Partner Type",
                                                placeholder: "Name of the partner",
                                                value: partner.partnerType,
                                                required: true,
                                                onChange: (e) =>
                                                    setPartner({ ...partner, partnerType: e.target.value }),
                                            }}
                                            data={PartnerTypes || []}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth component="fieldset">
                                        <AppTextInput
                                            labelText="Owner"
                                            id="username"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                readOnly: !state.editMode,
                                                disabled: !state.editMode,
                                                placeholder: "Owner",
                                                value: partner.owner.username,
                                                onChange: (e) =>
                                                    setPartner({ ...partner, username: e.target.value }),
                                            }}
                                        />
                                    </FormControl>
                                </Grid>

                                {/* <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth component="fieldset">
                                        <AppTextInput
                                            labelText="Phone Number"
                                            id="phone"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                readOnly: !state.editMode,
                                                disabled: !state.editMode,
                                                placeholder: "Phone Number",
                                                value: company.contactNo,
                                                onChange: (e) =>
                                                    setCompany({ ...company, contactNo: e.target.value }),
                                            }}
                                        />
                                    </FormControl>
                                </Grid> */}
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <SwitchWithLabel
                                        label="suspended"
                                        checked={partner.suspended}
                                        enabled={!state.editMode}
                                        onChange={(e) =>
                                            setPartner({ ...partner, suspended: e.target.checked })
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </DataFetchingStateComponent>
                    </FancyCard.CardContent>
                </form>
            </FancyCard>
        </div>
    );
}
