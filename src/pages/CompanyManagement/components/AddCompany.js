import React from 'react'
import AppButton from '../../../components/AppButton/AppButton'
import FancyCard from '../../../components/FancyCard/FancyCard'
import { Grid, FormControl, FormLabel } from "@material-ui/core";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";

export default function AddCompany({ closeDialog }) {
    const [state, setState] = React.useState({
        loading: false,
        companyData: {
            name: ""
        }
    });

    const onCompanySubmit = (e) => {
        e.preventDefault()
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
                        <Grid container>
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
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton type="submit" loadingText="Adding.." loading={state.loading}>Add</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}