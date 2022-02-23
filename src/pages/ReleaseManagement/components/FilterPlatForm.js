import React from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react'
import FancyCard from '../../../components/FancyCard/FancyCard';
import AppTextInput from '../../../components/AppTextInput/AppTextInput';
import GroupDropDown from '../../GroupManagement/components/GroupDropDown';
import CompanyDropDown from '../../CompanyManagement/components/CompanyDropDown';
import AppButton from '../../../components/AppButton/AppButton';
import { useStore } from '../../../stores';
import PlatformDropDown from "../../../components/AppTextInput/PlatformDropDown";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    PlatformDropDown:{
        minWidth: "217px"
    }
  }));

function FilterPlatform({ closeDialog }) {
    const { releaseStore } = useStore();
    const classes = useStyles();

    const onSubmit = (e) => {
        e.preventDefault();
        releaseStore.fetchVersions();
        closeDialog();
    }
    const obChangePlatform = (e) => {

    }

    return (
        <div>
            <FancyCard
                cardHeader={
                    <FancyCard.CardHeader color="purple">
                        {(headerClasses) => (
                            <>
                                <h4 className={headerClasses.cardTitleWhite}>
                                    Filter
                                </h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    Filter by platform
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <form onSubmit={onSubmit}>
                    <FancyCard.CardContent>
                        <Grid container> 
                            <PlatformDropDown 
                            labelText="Platform"
                            id="platform"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              required: true,
                              placeholder: "Platform",
                              value: releaseStore?.getFilters?.platform,
                              onChange: (e) => releaseStore?.changeFilters({...releaseStore?.getFilters, platform: e.target.value})
                            }}
                                />
                           
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton onClick={() => releaseStore?.resetFilter()}>Reset</AppButton>
                        <AppButton color='success' type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}

export default observer(FilterPlatform);
