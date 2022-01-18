import React from 'react'
import AppButton from '../../../components/AppButton/AppButton'
import FancyCard from '../../../components/FancyCard/FancyCard'
import { Grid, FormControl, FormLabel } from "@material-ui/core";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";

export default function AddGroup({ closeDialog }) {
    const [state, setState] = React.useState({
        loading: false,
        groupData: {
            name: ""
        }
    });

    const onGroupSubmit = () => {

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
