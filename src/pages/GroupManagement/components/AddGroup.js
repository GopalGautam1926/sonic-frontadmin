import React from 'react'
import AppButton from '../../../components/AppButton/AppButton'
import FancyCard from '../../../components/FancyCard/FancyCard'
import { Grid, FormControl, FormLabel } from "@material-ui/core";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import groupHttps from '../../../services/https/resources/group.https';
import { toast } from 'react-toastify';
import { log } from '../../../utils/app.debug';
import { groupStore } from '../../../stores/core/group.store';

export default function AddGroup({ closeDialog }) {
    const [state, setState] = React.useState({
        loading: false,
        groupData: {
            name: "",
            description: ""
        },
        error: null
    });

    const onGroupSubmit = (e) => {
        e.preventDefault()
        const payload = { ...state.groupData }

        setState({ ...state, loading: true })
        groupHttps.createGroup(payload).then(({ data }) => {
            setState({ ...state, loading: false })
            groupStore.addGroup(data)
            toast.success("Successfully added group")
            log("AddGroup Data", data)
        }).catch(({ err }) => {
            setState({ ...state, loading: false, error: err?.message })
            toast.error(err?.message || "Error adding group...")
            log("AddGroup Error", err)
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
                                    Create New Group
                                </h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    Create new Group
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <form onSubmit={onGroupSubmit}>
                    <FancyCard.CardContent>
                        <Grid container>
                            <FormControl fullWidth component="fieldset" >
                                <AppTextInput
                                    labelText="Group name"
                                    id="name"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        id: "name",
                                        required: true,
                                        value: state.groupData.name,
                                        onChange: (e) =>
                                            setState({
                                                ...state, groupData: {
                                                    ...state.groupData, name: e.target.value
                                                }
                                            }),
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton type="submit" loadingText="Adding.." loading={state.loading}>Create</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}
