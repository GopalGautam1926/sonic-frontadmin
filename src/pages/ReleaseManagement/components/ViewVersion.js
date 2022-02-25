import { Grid } from "@material-ui/core";
import React, { useState, useEffect, version } from "react";
import AppButton from "../../../components/AppButton/AppButton";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import FancyCard from "../../../components/FancyCard/FancyCard";
import RSpace from "../../../components/rcomponents/RSpace";
import { useParams, useLocation } from "react-router-dom";
import releaseHttps from "../../../services/https/resources/release.https";
import DataFetchingStateComponent from "../../../components/common/DataFetchingStateComponent";
import { toast } from "react-toastify";
import { SwitchWithLabel } from "../../../components/Switch/Switch";
import PlatformDropDown from "../../../components/AppTextInput/PlatformDropDown";
import { releaseStore } from "../../../stores/core";
//import TextAreaInput from "../../../components/AppTextInput/TextAreaInput";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectFile: {
    fontSize: 14,
    color: "#828282",
  },
  audioFile: {
    height: 25,
    width: "32vw",
    marginRight: 30,
    fontSize: 16,
    color: "#212529",
    borderBottom: "1px solid #ACACAC",
  },
  clue: {
    paddingBottom: 20,
    fontSize: 12,
    color: "#ACACAC",
  },
  uploadBtn: {
    height: 45,
    padding: "0px 20px",
    textTransform: "initial",
    fontSize: 15,
    fontFamily: 'Roboto-Bold',
    color: "#343F84",
    borderRadius: 8,
    border: "2px solid #343F84",
  },
}));


export default function ViewVersion({ closeDialog }) {
  const classes = useStyles();
  const [state, setState] = useState({
    editMode: false,
    loading: true,
    editLoading: false,
    disableLoading: false,
    suspendLoading: false,
    error: null,
    oldVersion: {}
  });
  let { versionId } = useParams();
  const [onEdit, setOnEdit] = useState(false);
  const [version, setVersion] = useState({
    versionCode: "",
    releaseNote: "",
    platform: "",
    latest: ""
  });

  const getAndSetVersion = async () => {
    try {
      setState({ ...state, loading: true, error: null });
      const { data } = await releaseHttps.findById(versionId);
      setVersion(data);
      setState({ ...state, loading: false });
      setState({ ...state, loading: false, oldVersion: data });
    } catch (error) {
      setState({ ...state, loading: false, error: error });
    }
  };

  useEffect(() => {
    getAndSetVersion();
  }, [versionId]);

  const onUpdateSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, editLoading: true });
    releaseHttps
      .updateVersion(versionId, version)
      .then(({ data }) => {
        setState({
          ...state,
          editLoading: false,
          editMode: false,
          oldVersion: data
        });
        releaseStore.updateVersion(data)
        toast.success("Updated successfully");
      })
      .catch((err) => {
        setState({ ...state, editLoading: false });
        toast.error(err.message || "Error while creating..");
      });
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader color="purple">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>Release</h4>
                <p className={headerClasses.cardCategoryWhite}>
                  {versionId || "--"}
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
              onClickTryAgain={() => getAndSetVersion()}
            >
              <RSpace justifyContent="flex-end">
                {state.editMode && (
                  <RSpace.Item>
                    <AppButton
                      onClick={() => {
                        setState({ ...state, editMode: false });
                        setVersion(state.oldVersion);
                      }}
                      type="button"
                      color="warning"
                    >
                      Cancel
                    </AppButton>
                  </RSpace.Item>
                )}

                {!onEdit ? state.editMode && (
                  <RSpace.Item>
                    <AppButton
                      loading={state.editLoading}
                      loadingText="Updating..."
                      type="submit"
                      onClick={() => {

                      }}
                    >
                      Update
                    </AppButton>
                  </RSpace.Item>
                ) : null}

                {!state.editMode && (
                  <RSpace.Item>
                    <AppButton
                      onClick={() => {
                        setState({ ...state, editMode: true });
                      }}
                      type={state.editMode ? "button" : "button"}
                    >
                      Edit
                    </AppButton>
                  </RSpace.Item>
                )}


              </RSpace>
              <Grid container spacing={1}>
                <Grid item xs={18} sm={6} md={6}>
                  <AppTextInput
                    labelText="Version code"
                    id="versionCode"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      readOnly: !state.editMode,
                      disabled: !state.editMode,
                      placeholder: "version code",
                      type:"number",
                      value: version.versionCode,
                      required: true,
                      onChange: (e) =>
                        setVersion({ ...version, versionCode: e.target.value }),
                    }}
                  />
                </Grid>
                <Grid item xs={18} sm={6} md={6}>
                  <PlatformDropDown
                    labelText="Platform"
                    id="platform"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      readOnly: !state.editMode,
                      disabled: !state.editMode,
                      required: true,
                      placeholder: "Platform",
                      value: version.platform,
                      onChange: (e) => { setVersion({ ...version, platform: e.target.value }) }
                    }}
                  ></PlatformDropDown>
                </Grid>
                </Grid>

                {/* <Grid item xs={18} sm={6} md={6}>
                <Typography className={classes.selectFile}>
              Release Note
            </Typography>
                  <TextAreaInput
                    id="releaseNote"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      readOnly: !state.editMode,
                      required: true,
                      disabled: !state.editMode,
                      value: version.releaseNote,
                      onChange: (e) => {
                        setVersion({ ...version, releaseNote: e.target.value })
                      },
                    }}
                  />
                </Grid> */}
              <Grid container>
              <Grid item xs={12} sm={6}>
              <AppTextInput
                  labelText="Release note"
                  id="releaseNote"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    readOnly: !state.editMode,
                    required: true,
                    multiline: true,
                    disabled: !state.editMode,
                    value: version.releaseNote,
                    onChange: (e) => {
                      setVersion({ ...version, releaseNote: e.target.value })
                    },
                  }}
                />
              </Grid>
            </Grid>
                <Grid container>
                  <Grid item >
                    <SwitchWithLabel
                      label="Mark as latest"
                      checked={version.latest}
                      disabled={!state.editMode}
                      onChange={(e) =>
                        setVersion({ ...version, latest: e.target.checked })
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
