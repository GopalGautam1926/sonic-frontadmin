import React from 'react';
import { Avatar, Divider, Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
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

const initialUserData = {
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

    const getAndSetUser = () => {
        try {
            setState({ ...state, loading: true, error: null });
            if (location?.state?.user) {
                setUser(location?.state?.user)
                setState({ ...state, loading: false, user: location?.state?.user })
            }
        } catch (error) {
            setState({ ...state, loading: false, error: error });
            toast.error("Error viewing data!")
        }
    }

    React.useEffect(() => {
        getAndSetUser();
    }, [userId])

    const onAddUserGroup = (handleClose) => {
        setState({ ...state, addLoading: true });
        let payloadCompany = {
            user: user._id,
            company: state.company,
        }
        const company = user?.companies?.find(({ _id }) => _id === state?.company);
        if (company) {
            setState({
                ...state,
                newCompany: {
                    ...state,
                    addLoading: false,
                    editMode: false,
                }
            })
            toast.warn("Company already added");
        } else {
            usersHttps.addUserToCompany(user?._id, payloadCompany).then(({ data }) => {
                setState({
                    ...state,
                    newCompany: {
                        ...state,
                        addLoading: false,
                        user: data,
                        company: '',
                    }
                })
                setUser(data);
                userStore.updateUser(user?._id, data);
                toast.success("Added");
                handleClose?.();
            }).catch((err) => {
                setState({ ...state, addLoading: false });
                toast.error(err.message || "Error while creating..")
            })
        }
    }

    const onRemoveCompany = (company) => {
        setState({ ...state, removingLoading: true, removingCompany: company });
        let payloadCompany = {
            user: user._id,
            company: company,
        }
        usersHttps.removeUserFromCompany(user?._id, payloadCompany).then(({ data }) => {
            setState({
                ...state,
                removingLoading: false,
                user: data
            })
            setUser(data);
            userStore.updateUser(user?._id, data);
            toast.success("Deleted successfully");
        }).catch((err) => {
            setState({ ...state, removingLoading: false });
            toast.error(err.message || "Error while creating..")
        })
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
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4} md={4}>
                                <div style={{ fontWeight: 'bold', color: 'grey' }}>
                                    EMAIL: <span style={{ fontWeight: 'normal', color: 'grey' }}>{user?.email}</span>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <div style={{ fontWeight: 'bold', color: 'grey' }}>
                                    USERNAME: <span style={{ fontWeight: 'normal', color: 'grey' }}>{user?.username}</span>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <div style={{ fontWeight: 'bold', color: 'grey' }}>
                                    PHONE NUMBER: <span style={{ fontWeight: 'normal', color: 'grey' }}>{user?.phone_number}</span>
                                </div>
                            </Grid>
                        </Grid>

                        <Divider style={{ marginTop: 20, marginBottom: 10 }} />
                        <InputLabel style={{ display: "flex", alignItems: "center" }}>
                            <div>COMPANIES ({user?.companies?.length})</div>
                            <RPopover
                                paperStyle={{ minWidth: 500 }}
                                TransitionProps={{
                                    onExit: () => setState({ ...state, company: "" }),
                                }}
                                anchorElement={
                                    <AppButton
                                        asIconButton={true}
                                        variant="container"
                                        color="success"
                                        size="small"
                                    >
                                        {<AddIcon style={{ fontSize: 20 }} />}
                                    </AppButton>
                                }
                            >
                                {({ handleClose }) => (
                                    <div style={{ padding: 15 }}>
                                        <CompanyDropDown
                                            labelText="Associated Company"
                                            value={state.company}
                                            fullWidth
                                            onChange={(e) => {
                                                setState({ ...state, company: e.target.value })
                                            }}
                                            success={state.company ? true : false}
                                            style={{ marginBottom: 10 }}
                                        />
                                        <AppButton
                                            color="success"
                                            onClick={() => onAddUserGroup(handleClose)}
                                            disabled={state.company ? false : true}
                                            loading={state.addLoading}
                                        >
                                            Add
                                        </AppButton>
                                    </div>
                                )}
                            </RPopover>
                        </InputLabel>

                        <Grid xs={12} sm={6} md={6}>
                            <List>
                                {user?.companies?.map((company, index) => (
                                    <ListItem alignItems="center" key={index}>
                                        <ListItemAvatar>
                                            <Avatar>{company?.name?.charAt?.(0) || "U"}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={company?.name || company?._id}
                                            secondary={company?.email || "--"}
                                        />
                                        <RPopconfirm
                                            anchorElement={
                                                <AppButton
                                                    asIconButton={true}
                                                    color="danger"
                                                    size="small"
                                                    loading={
                                                        company?._id == state.removingCompany &&
                                                        state.removingLoading
                                                    }
                                                >
                                                    <DeleteOutlined style={{ fontSize: 18 }} />
                                                </AppButton>
                                            }
                                            onClickYes={() => onRemoveCompany(company?._id)}
                                            message="Really want to delete this item?"
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </DataFetchingStateComponent>
                </FancyCard.CardContent>
            </FancyCard>
        </div>
    );
}
