import React from 'react';
import { Divider, FormControl, Grid, Typography } from '@material-ui/core';
import { useLocation, useParams } from 'react-router-dom';
import AppButton from '../../../components/AppButton/AppButton';
import DataFetchingStateComponent from '../../../components/common/DataFetchingStateComponent';
import FancyCard from '../../../components/FancyCard/FancyCard';
import usersHttps from '../../../services/https/resources/users.https';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import { toast } from 'react-toastify';
import RSpace from '../../../components/rcomponents/RSpace';
import { userRoles } from '../../../constants';
import { SwitchWithLabel } from '../../../components/Switch/Switch';

const initialUserData = {
    editMode: false,
    editLoading: false,
    loading: true,
    error: null,
    user: {},
    newPassword: "",
    confirmNewPassword: "",
    checkPassword: "",
    removingLoading: false,
    removingUser: ""
}

export default function ViewUsers() {
    const [state, setState] = React.useState(initialUserData);
    let { userId } = useParams();
    const location = useLocation();
    const [user, setUser] = React.useState({});

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

    const onUpdateSubmit = (e) => {
        e.preventDefault();
        setState({ ...state, editLoading: true });

        let payload = {
            password: state?.newPassword || undefined,
            phoneNumber: user?.phone_number || undefined,
            enabled: user?.enabled,
        }

        if (state.checkPassword) {
            usersHttps.updateUser(user._id, payload)
                .then(({ data }) => {
                    setState({
                        ...state,
                        editLoading: false,
                        editMode: false,
                        user: data,
                    });
                    toast.success("Updated successfully");
                })
                .catch((err) => {
                    setState({ ...state, editLoading: false });
                    toast.error(err?.message || "Error while creating..");
                });
        } else {
            setState({ ...state, editLoading: false });
        }
    };

    const validating = () => {
        if (state.newPassword !== state.confirmNewPassword) {
            toast.error("Password does not match!");
            setState({ ...state, checkPassword: false });
        } else {
            setState({ ...state, checkPassword: true });
        }
    }

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
                <form onSubmit={onUpdateSubmit}>
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
                                        onClickYes={onDeleteUser}
                                        message="Really want to remove this user?"
                                    />
                                </RSpace.Item> */}
                            </RSpace>

                            <Typography style={{ fontWeight: 'bold' }}>User Details</Typography>
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
                                    <Typography style={{ marginTop: 20, fontWeight: 'bold' }}>{getAccountType()} Details</Typography>
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
                                                            labelText="Company Name"
                                                            id="companyName"
                                                            formControlProps={{
                                                                fullWidth: true,
                                                            }}
                                                            inputProps={{
                                                                readOnly: true,
                                                                disabled: true,
                                                                value: user?.company?.name,
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth component="fieldset">
                                                        <AppTextInput
                                                            labelText="Company Type"
                                                            id="companyType"
                                                            formControlProps={{
                                                                fullWidth: true,
                                                            }}
                                                            inputProps={{
                                                                readOnly: true,
                                                                disabled: true,
                                                                value: user?.company?.companyType,
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <FormControl fullWidth component="fieldset">
                                                        <AppTextInput
                                                            labelText="Company URN / ID"
                                                            id="CompanyUrnId"
                                                            formControlProps={{
                                                                fullWidth: true,
                                                            }}
                                                            inputProps={{
                                                                readOnly: true,
                                                                disabled: true,
                                                                value: user?.company?.companyUrnOrId,
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                    }
                                </>
                            }

                            <Typography style={{ marginTop: 20, fontWeight: 'bold' }}>Password</Typography>
                            <Divider style={{ marginBottom: 20 }} />

                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth component="fieldset">
                                        <AppTextInput.AppPasswordInput
                                            labelText="New Password"
                                            id="newPassword"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                readOnly: !state.editMode,
                                                disabled: !state.editMode,
                                                value: state.newPassword,
                                                onChange: (e) => setState({ ...state, newPassword: e.target.value }),
                                            }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth component="fieldset">
                                        <AppTextInput.AppPasswordInput
                                            labelText="Confirm New Password"
                                            id="confirmNewPassword"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                readOnly: !state.editMode,
                                                disabled: !state.editMode,
                                                value: state.confirmNewPassword,
                                                onChange: (e) => setState({ ...state, confirmNewPassword: e.target.value }),
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Typography style={{ marginTop: 20, fontWeight: 'bold' }}>Status</Typography>
                            <Divider style={{ marginBottom: 20 }} />
                            <Grid item>
                                <SwitchWithLabel
                                    disabled={!state.editMode}
                                    label={user.enabled ? "Active" : "Inactive"}
                                    checked={user.enabled}
                                    onChange={(e) => setUser({ ...user, enabled: e.target.checked })}
                                />
                            </Grid>
                        </DataFetchingStateComponent>
                    </FancyCard.CardContent>
                </form>
            </FancyCard>
        </div>
    );
}
