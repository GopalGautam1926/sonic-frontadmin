import React from 'react';
import { Avatar, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { useLocation, useParams } from 'react-router-dom';
import AppButton from '../../../components/AppButton/AppButton';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import FancyCard from '../../../components/FancyCard/FancyCard';
import AddIcon from "@material-ui/icons/Add";
import usersHttps from '../../../services/https/resources/users.https';
import CompanyDropDown from '../../CompanyManagement/components/CompanyDropDown';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import { toast } from 'react-toastify';
import { useStore } from '../../../stores';
import { log } from '../../../utils/app.debug';
import RPopover from '../../../components/rcomponents/RPopover';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import RPopconfirm from '../../../components/rcomponents/RPopconfirm';
import RSpace from '../../../components/rcomponents/RSpace';
import { userRoles } from '../../../constants';

const initialUserData = {
    editMode: false,
    editLoading: false,
    loading: true,
    addLoading: false,
    error: null,
    user: {},
    group: '',
    company: '',
    removingLoading: false,
    removingCompany: '',
}

export default function ViewUsers() {
    const [state, setState] = React.useState(initialUserData);
    let { userId } = useParams();
    const location = useLocation();
    const [user, setUser] = React.useState({});
    const { userStore } = useStore();

    const getAndSetUser = async () => {
        try {
            setState({ ...state, loading: true, error: null });
            if (location?.state?.user) {
                setUser(location?.state?.user)
                setState({ ...state, loading: false, user: location?.state?.user })
            } else {
                const { data } = await usersHttps.findById(userId);
                setUser(data);
                setState({ ...state, loading: false, user: data });
            }
        } catch (error) {
            setState({ ...state, loading: false, error: error });
            toast.error("Error viewing data!")
        }
    }

    React.useEffect(() => {
        getAndSetUser();
    }, [userId])

    // const onAddUserGroup = (handleClose) => {
    //     setState({ ...state, addLoading: true });
    //     let payloadCompany = {
    //         user: user._id,
    //         company: state.company,
    //     }
    //     const company = user?.companies?.find(({ _id }) => _id === state?.company);
    //     if (company) {
    //         setState({
    //             ...state,
    //             newCompany: {
    //                 ...state,
    //                 addLoading: false,
    //                 editMode: false,
    //             }
    //         })
    //         toast.warn("Company already added");
    //     } else {
    //         usersHttps.addUserToCompany(user?._id, payloadCompany).then(({ data }) => {
    //             setState({
    //                 ...state,
    //                 newCompany: {
    //                     ...state,
    //                     addLoading: false,
    //                     user: data,
    //                     company: '',
    //                 }
    //             })
    //             setUser(data);
    //             userStore.updateUser(user?._id, data);
    //             toast.success("Added");
    //             handleClose?.();
    //         }).catch((err) => {
    //             setState({ ...state, addLoading: false });
    //             toast.error(err.message || "Error while creating..")
    //         })
    //     }
    // }

    // const onRemoveCompany = (company) => {
    //     setState({ ...state, removingLoading: true, removingCompany: company });
    //     let payloadCompany = {
    //         user: user._id,
    //         company: company,
    //     }
    //     usersHttps.removeUserFromCompany(user?._id, payloadCompany).then(({ data }) => {
    //         setState({
    //             ...state,
    //             removingLoading: false,
    //             user: data
    //         })
    //         setUser(data);
    //         userStore.updateUser(user?._id, data);
    //         toast.success("Deleted successfully");
    //     }).catch((err) => {
    //         setState({ ...state, removingLoading: false });
    //         toast.error(err.message || "Error while creating..")
    //     })
    // }

    const getAccountType = () => {
        if (user?.userRole === userRoles.PARTNER_ADMIN || user?.userRole === userRoles.PARTNER_USER) {
            return "Partner"
        } else if (user?.userRole === userRoles.COMPANY_ADMIN || user?.userRole === userRoles.COMPANY_USER) {
            return "Company"
        }
        return null
    }

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="success">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>User</h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    {userId || "--"}
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <FancyCard.CardContent>
                    <DataFetchingStateComponent
                        loading={state.loading}
                        error={state.error}
                        onClickTryAgain={() => getAndSetUser()}
                    >
                        <RSpace justifyContent="flex-end">
                            {state.editMode && (
                                <RSpace.Item>
                                    <AppButton
                                        onClick={() => {
                                            setState({ ...state, editMode: false });
                                            setUser(state.user);
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

                        <Typography>User Details</Typography>
                        <Divider style={{ marginBottom: 20 }} />

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth component="fieldset">
                                    <AppTextInput
                                        labelText="User ID"
                                        id="userId"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            readOnly: true,
                                            disabled: true,
                                            value: user?._id,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth component="fieldset">
                                    <AppTextInput
                                        labelText="Username"
                                        id="username"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            readOnly: true,
                                            disabled: true,
                                            value: user?.username,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth component="fieldset">
                                    <AppTextInput
                                        labelText="Email"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            readOnly: true,
                                            disabled: true,
                                            value: user?.email,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
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
                                            value: user?.phone_number,
                                            required: true,
                                            onChange: (e) =>
                                                setUser({ ...user, phone_number: e.target.value }),
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            {getAccountType() !== null &&
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth component="fieldset">
                                        <AppTextInput
                                            labelText="Account Type"
                                            id="accountType"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                readOnly: true,
                                                disabled: true,
                                                value: getAccountType(),
                                            }}
                                        />
                                    </FormControl>
                                </Grid>}
                        </Grid>

                        {getAccountType() !== null &&
                            <>
                                <Typography style={{ marginTop: 20 }}>{getAccountType()} Details</Typography>
                                <Divider style={{ marginBottom: 20 }} />
                                {
                                    getAccountType() === "Partner" ?
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControl fullWidth component="fieldset">
                                                    <AppTextInput
                                                        labelText="Partner Name"
                                                        id="partnerName"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                        inputProps={{
                                                            readOnly: true,
                                                            disabled: true,
                                                            value: user?.partner?.name,
                                                            onChange: (e) =>
                                                                setUser({ ...user, partner: { ...user.partner, name: e.target.value } }),
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        :
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControl fullWidth component="fieldset">
                                                    <AppTextInput
                                                        labelText="User ID"
                                                        id="userId"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                        inputProps={{
                                                            readOnly: true,
                                                            disabled: true,
                                                            value: user?._id,
                                                            onChange: (e) =>
                                                                setUser({ ...user, _id: e.target.value }),
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControl fullWidth component="fieldset">
                                                    <AppTextInput
                                                        labelText="Username"
                                                        id="username"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                        inputProps={{
                                                            readOnly: true,
                                                            disabled: true,
                                                            value: user?.username,
                                                            onChange: (e) =>
                                                                setUser({ ...user, username: e.target.value }),
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <FormControl fullWidth component="fieldset">
                                                    <AppTextInput
                                                        labelText="Email"
                                                        id="email"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                        inputProps={{
                                                            readOnly: true,
                                                            disabled: true,
                                                            value: user?.email,
                                                            onChange: (e) =>
                                                                setUser({ ...user, email: e.target.value }),
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                }
                            </>
                        }
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    );
}
