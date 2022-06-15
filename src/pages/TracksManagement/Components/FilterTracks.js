import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import AppButton from '../../../components/AppButton/AppButton'
import AppTextInput from '../../../components/AppTextInput/AppTextInput'
import CustomDropDown from '../../../components/AppTextInput/CustomDropDown';
import FancyCard from '../../../components/FancyCard/FancyCard';
import CompanyPicker from '../../../components/Picker/CompanyPicker';
import UserPicker from '../../../components/Picker/UserPicker/UserPicker';
import { Distributor, Labels } from '../../../constants';
import { useStore } from '../../../stores';

function FilterTracks({ closeDialog }) {
    const { tracksStore} = useStore();

    const onSubmit = (e) => {
        e.preventDefault();
        tracksStore.fetchTracks(1)
        closeDialog();
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
                                    Filter by tracks
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <form onSubmit={onSubmit}>
                    <FancyCard.CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} md={3}>
                                <AppTextInput
                                    labelText="ID"
                                    id="id"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Track ID",
                                        value: tracksStore?.filters?.id,
                                        onChange: (e) => tracksStore?.changeFilters({ ...tracksStore?.filters, id: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AppTextInput
                                    labelText="Title"
                                    id="title"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Title",
                                        value: tracksStore?.filters?.title,
                                        onChange: (e) => tracksStore?.changeFilters({ ...tracksStore?.filters, title: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AppTextInput
                                    labelText="Artist"
                                    id="artist"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Artist",
                                        value: tracksStore?.filters?.artist,
                                        onChange: (e) => tracksStore?.changeFilters({ ...tracksStore?.filters, artist: e.target.value })
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <CustomDropDown
                                    labelText="Label"
                                    id="label"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Label",
                                        value: tracksStore?.filters?.label,
                                        onChange: (e) => tracksStore?.changeFilters({ ...tracksStore?.filters, label: e.target.value })
                                    }}
                                    data={Labels || []}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <CustomDropDown
                                    labelText="Distributor"
                                    id="distributor"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        placeholder: "Distributor",
                                        value: tracksStore?.filters?.distributor,
                                        onChange: (e) => tracksStore?.changeFilters({ ...tracksStore?.filters, distributor: e.target.value })
                                    }}
                                    data={Distributor || []}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <CompanyPicker
                                    labelText="Associated Company"
                                    placeholder="Search for company"
                                    value={tracksStore?.filters?.company}
                                    getSelectedValue={(company) => tracksStore?.changeFilters({ ...tracksStore?.filters, company: company })}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <UserPicker
                                    labelText="User"
                                    placeholder="Search for user"
                                    value={tracksStore?.filters?.user}
                                    getSelectedValue={(user) => tracksStore?.changeFilters({ ...tracksStore?.filters, user: user })}
                                />
                            </Grid>
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        <AppButton onClick={() => tracksStore?.resetFilter()}>Reset</AppButton>
                        <AppButton color='success' type="submit">Apply</AppButton>
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    )
}

export default observer(FilterTracks);
