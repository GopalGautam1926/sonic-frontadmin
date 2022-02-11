import React, { useEffect, useState } from "react";
import AppButton from '../../../components/AppButton/AppButton'
import FancyCard from '../../../components/FancyCard/FancyCard'
import ReleaseHttps from "../../../services/https/resources/release.https";
import AppTextInput from "../../../components/AppTextInput/AppTextInput";
import { SwitchWithLabel } from "../../../components/Switch/Switch";
import { toast } from "react-toastify";
import { useStore } from '../../../stores'
import { Grid } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PlatformDropDown from "../../../components/AppTextInput/PlatformDropDown";

const useStyles = makeStyles((theme) => ({
  EncodeDecodeContainer: {
    backgroundColor: "white",
    padding: "2% 2.5%",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 30,
    fontFamily: 'NunitoSans-ExtraBold',
    color: "#343F84",
  },
  subHeading: {
    paddingBottom: 30,
    fontSize: 18,
    fontFamily: 'NunitoSans-Regular',
    color: "#00A19A",
  },
  selectFile: {
    fontSize: 12,
    fontFamily: 'NunitoSans-Regular',
    color: "#ACACAC",
  },
  audioFile: {
    height: 25,
    width: "30vw",
    marginRight: 30,
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: "#757575",
    borderBottom: "1px solid #757575",
  },
  clue: {
    paddingBottom: 20,
    fontSize: 12,
    fontFamily: 'NunitoSans-Regular',
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
  decodeBtn: {
    height: 45,
    padding: "0px 20px",
    textTransform: "initial",
    fontSize: 15,
    fontFamily: 'NunitoSans-Bold',
    borderRadius: 8,
    color: 'white',
    backgroundColor: '#343F84'
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

  // On file select (from the pop up)
  const onFileChange = event => {
    // Update the state
    const file = event.target.files[0]
    setVersion({ ...version, file: file });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mediaFile", version?.file);
    formData.append("data", JSON.stringify(version.data));
    console.log("---------------", version.data)
    ReleaseHttps
      .uploadVersion(formData)
      .then(({ data }) => {
        toast.success("Version successfully created.");
        closeDialog?.()
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        toast.error(err.message || "Error while uploading..");
      });
  };

  return (
    <div>
      <FancyCard
        cardHeader={
          <FancyCard.CardHeader color="purple">
            {(headerClasses) => (
              <>
                <h4 className={headerClasses.cardTitleWhite}>
                  Create New Version
                </h4>
                <p className={headerClasses.cardCategoryWhite}>
                  Add new version
                </p>
              </>
            )}
          </FancyCard.CardHeader>
        }
      >
        <form onSubmit={onSubmit}>
          <FancyCard.CardContent>
            <Grid item xs={12} sm={6} md={6}>
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
                  Upload a file
                </AppButton>
              </label>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6}>
                <AppTextInput
                  labelText="VersionCode"
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
              <Grid item xs={12} sm={6} md={6}>
                <AppTextInput
                  labelText="ReleaseNote"
                  id="ReleaseNote"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    placeholder: "release note",
                    value: version.releaseNote,
                    onChange: (e) => { setVersion({ ...version, data: { ...version?.data, releaseNote: e.target.value } }) },
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6} md={6}>
              <AppTextInput
                labelText="Platform"
                id="Platform"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  required: true,
                  placeholder: "platform",
                  value: version.platform,
                  onChange: (e) => { setVersion({ ...version, data: { ...version?.data, platform: e.target.value } }) },
                }}
              />
            </Grid> */}
              <Grid item xs={12} sm={6} md={6}>
                <PlatformDropDown
                  labelText="Platform"
                  id="platform"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    placeholder: "Platform",
                    value: version.platform,
                    onChange: (e) => { setVersion({ ...version, data: { ...version?.data, platform: e.target.value } }) }
                  }}
                ></PlatformDropDown>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} md={6}>
                  <SwitchWithLabel
                    label="Mark as latest"
                    checked={version.data.latest}
                    onChange={(e) =>
                      setVersion({ ...version, data: { ...version?.data, latest: e.target.checked } })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </FancyCard.CardContent>
          <FancyCard.CardActions>
            <AppButton color="danger" onClick={() => closeDialog?.()}>
              Close
            </AppButton>
            <AppButton type="submit" >Submit</AppButton>
          </FancyCard.CardActions>
        </form>
      </FancyCard>
    </div>


  )
}
















