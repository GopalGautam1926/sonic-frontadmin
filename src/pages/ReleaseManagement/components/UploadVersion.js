import React, { useEffect, useState } from "react";
import AppButton from '../../../components/AppButton/AppButton'
import FancyCard from '../../../components/FancyCard/FancyCard'
import ReleaseHttps from "../../../services/https/resources/release.https";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
//import TextAreaInput from "../../../components/AppTextInput/TextAreaInput";
import { SwitchWithLabel } from "../../../components/Switch/Switch";
import { toast } from "react-toastify";
import { useStore } from '../../../stores'
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PlatformDropDown from "../../../components/AppTextInput/PlatformDropDown";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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

export default function UploadVersion({ closeDialog }) {
  const initialVersion = {
    file: null,
    fileName: null,
    data: {
      latest: true,
      versionCode: '',
      releaseNote: '',
      platform: ''
    }
  };
  const classes = useStyles();
  const { releaseStore } = useStore()
  const [version, setVersion] = useState(initialVersion);
  const [state, setState] = useState({
    loading: false,
  });
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  // On file select (from the pop up)
  const onFileChange = event => {
    // Update the state
    const file = event.target.files[0]
    setVersion({ ...version, file: file, fileName: file.name });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    const formData = new FormData();
    formData.append("mediaFile", version?.file);
    formData.append("data", JSON.stringify(version.data));
    console.log("-------------------------data", version.data)
    if (!version.file) {
      setState({ ...state, loading: false });
      toast.error("File has not been uploaded.")
    } else {
      ReleaseHttps
        .uploadVersion(formData)
        .then(({ data }) => {
          releaseStore.addVersion(data)
          toast.success("Successfully added Release")
          closeDialog?.()
        })
        .catch((err) => {
          setState({ ...state, loading: false });
          toast.error(err.message || "Error while uploading..");
        });
    }
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader color="purple">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>
                  Create New Release
                </h4>
                <p className={headerClasses.cardCategoryWhite}>
                  Add new Release
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <form onSubmit={onSubmit}>
          <FancyCard.CardContent>
            <Grid container fullWidth>
              <Grid item xs={12}>
              <input
                  accept=""
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={onFileChange}
                />
                <label htmlFor="contained-button-file">
                  <AppButton
                    component="span"
                    className={classes.uploadBtn}
                  >
                    Select a file
                  </AppButton>
                  {version?.fileName && <Typography>
                  {truncate(version?.fileName, 50)}
                </Typography>}
                </label>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
              <AppTextInput
                  fullWidth
                  labelText="Version code"
                  id="versionCode"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    placeholder: "verson code",
                    value: version?.data?.versionCode,
                    onChange: (e) => { setVersion({ ...version, data: { ...version?.data, versionCode: e.target.value } }) },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
              <PlatformDropDown
                  labelText="Platform"
                  id="platform"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    placeholder: "Platform",
                    value: version?.data?.platform,
                    onChange: (e) => { setVersion({ ...version, data: { ...version?.data, platform: e.target.value } }) }
                  }}
                ></PlatformDropDown>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6}>
              <AppTextInput
                  labelText="Release note"
                  id="releasenote"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    multiline: true,
                    placeholder: "release note",
                    value: version?.data?.releaseNote,
                    onChange: (e) => { setVersion({ ...version, data: { ...version?.data, releaseNote: e.target.value } }) },
                  }}
                />
              </Grid>
            </Grid>
          </FancyCard.CardContent>
          <FancyCard.CardActions>
            <AppButton color="danger" onClick={() => closeDialog?.()}>
              Close
            </AppButton>
            <AppButton type="submit" loadingText="Creating.." loading={state.loading}>Submit</AppButton>
          </FancyCard.CardActions>
        </form>
      </FancyCard>
    </div>


  )
}
















