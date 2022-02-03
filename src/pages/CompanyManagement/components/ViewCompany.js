import React from 'react';
import { Grid } from '@material-ui/core';
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

export default function ViewCompany({ closeDialog }) {
    const [state, setState] = React.useState({
        editMode: false,
        loading: true,
        editLoading: false,
        error: null,
        company: {},
        disabled: false,
        deleteLoading: false,
        checkEmail: false,
    });
    let { companyId } = useParams();
    const location = useLocation();
    const history = useHistory();
    const { companyStore } = useStore();
    const [company, setCompany] = React.useState({
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
    });

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
    }

    React.useEffect(() => {
        getAndSetCompany();
    }, [companyId])

    const onUpdateSubmit = (e) => {
        e.preventDefault();
        setState({ ...state, editLoading: true });

        if (state?.checkEmail) {
            companyHttps
                .updateCompany(company._id, company)
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
        } else {
            setState({ ...state, editLoading: false });
        }
    };

    // const onRemoveCompany = () => {
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
        let Emailverification = (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(company?.email));
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
                                {state.editMode && (
                                    <RSpace.Item>
                                        <AppButton
                                            onClick={() => {
                                                setState({ ...state, editMode: false });
                                                setCompany(state.company);
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
                                            value: company.name,
                                            required: true,
                                            onChange: (e) =>
                                                setCompany({ ...company, name: e.target.value }),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <AppTextInput
                                        labelText="Company Email"
                                        id="companyEmail"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            readOnly: !state.editMode,
                                            disabled: !state.editMode,
                                            placeholder: "Company Email",
                                            value: company.email,
                                            required: true,
                                            onChange: (e) =>
                                                setCompany({ ...company, email: e.target.value }),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
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
                                </Grid>
                            </Grid>
                        </DataFetchingStateComponent>
                    </FancyCard.CardContent>
                </form>
            </FancyCard>
        </div>
    );
}