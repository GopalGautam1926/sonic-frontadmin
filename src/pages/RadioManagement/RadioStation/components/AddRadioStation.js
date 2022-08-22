import React, { useState } from "react";
import { Grid, Tooltip, Typography } from "@material-ui/core";
import AppButton from "../../../../components/AppButton/AppButton";
import FancyCard from "../../../../components/FancyCard/FancyCard";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import * as xlsx from "xlsx";
import { toast } from "react-toastify";
import RadiostationHttps from "../../../../services/https/resources/radiostation.https";

export default function AddRadioStation({ closeDialog }) {
    const [state, setState] = useState({
        loading: false,
        validateLoading: false,
        file: '',
        sheet: [],
        totalStations: 0
    });
    const inputRef = React.useRef(null);

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImportedSheet(e, 'dragdrop');
        }
    };

    // triggers when file is selected with click
    const handleImport = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleImportedSheet(e, 'import');
        }
    };

    const handleImportedSheet = (e, type) => {
        const files = type === 'import' ? e.target.files : e.dataTransfer.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = xlsx.read(event.target.result);
                const sheets = wb.SheetNames;

                let sheet = [];
                let count = 0;
                for (let i = 0; i < sheets.length; i++) {
                    const rows = xlsx.utils.sheet_to_json(wb.Sheets[sheets[i]]);
                    sheet.push(rows);
                    count += rows.length;
                }
                setState({ ...state, sheet: sheet, file: file, totalStations: count })
            }
            reader.readAsArrayBuffer(file);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setState({ ...state, loading: true });

        for (let i = 0; i < state.sheet.length; i++) {
            for (const appgenId of state.sheet[i]) {
                if (!appgenId?.appGenStationId) {
                    setState({ ...state, loading: false });
                    toast.error("appGenStationId is missing for some stations")
                    return;
                }
            }
        }

        const formData = new FormData();
        formData.append('importFile', state.file)

        RadiostationHttps.createNewAppgenRadioStation(formData)
            .then(({ data }) => {
                setState({ ...state, loading: false, sheet: [], file: '' });
                if (data?.totalDuplicateStations?.length > 0) {
                    toast.info(`${data?.totalDuplicateStations?.length} duplicate stations`)
                } else {
                    toast.success("Imported successfully");
                }
                closeDialog?.()
            })
            .catch((err) => {
                setState({ ...state, loading: false });
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
                                <h4 className={headerClasses.cardTitleWhite}>
                                    Import Radio Stations from Excel
                                </h4>
                                <p className={headerClasses.cardCategoryWhite}>
                                    Add new Radio Station
                                </p>
                            </>
                        )}
                    </FancyCard.CardHeader>
                }
            >
                <form
                    onSubmit={onSubmit}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    enctype="multipart/form-data"
                >
                    <FancyCard.CardContent>
                        <Grid
                            container
                            style={{
                                textAlign: 'center',
                                padding: '10px',
                                width: '100%',
                                borderWidth: '3px',
                                borderStyle: 'dashed',
                                borderColor: 'lightgray',
                            }}
                        >
                            <input
                                style={{ display: 'none' }}
                                ref={inputRef}
                                id="input-file-upload"
                                type="file"
                                name="uploaded_file"
                                multiple={true}
                                onChange={handleImport}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />
                            <Grid item style={{ width: '100%' }}>
                                <label
                                    htmlFor='input-file-upload'
                                    style={{ padding: '30px 10px 20px 10px' }}
                                >
                                    {
                                        state.sheet.length > 0 ?
                                            <Typography variant="h6">
                                                {state?.file?.name}
                                            </Typography>
                                            :
                                            <Typography variant="h6">
                                                Drag & Drop a file to upload or {" "}
                                                <AppButton
                                                    variant={"contained"}
                                                    fontSize={"20px"}
                                                    style={{ padding: "5px 10px" }}
                                                    onClick={() => inputRef.current.click()}
                                                >
                                                    browse
                                                </AppButton>
                                            </Typography>
                                    }

                                </label>
                                <Grid container justifyContent='flex-end' style={{}}>
                                    <Tooltip title={"Only supports excel for now"} placement={"bottom-end"}>
                                        <HelpOutlineIcon style={{ fontSize: "15px" }} />
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    </FancyCard.CardContent>

                    <FancyCard.CardActions>
                        <AppButton color="danger" onClick={() => closeDialog?.()}>
                            Close
                        </AppButton>
                        {state.sheet.length > 0 && <>
                            <AppButton color="warning" onClick={() => setState({ ...state, sheet: [], file: '' })}>Clear</AppButton>
                            <AppButton id="create" type="submit" loadingText="Creating.." loading={state.loading}>Import</AppButton>
                            <span>(Importing {state.totalStations} {state.totalStations > 1 ? 'stations' : 'station'})</span>
                        </>
                        }
                    </FancyCard.CardActions>
                </form>
            </FancyCard>
        </div>
    );
}
