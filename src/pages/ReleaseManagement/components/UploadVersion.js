import React from 'react'
import AppButton from '../../../components/AppButton/AppButton'
import FancyCard from '../../../components/FancyCard/FancyCard'

export default function UploadVersion({closeDialog}) {
    const [state, setState] = React.useState({

    });

    return (
        <div>
            <input
                color="primary"
                accept=""
                type="file"
                id="icon-button-file"
            />
            <label htmlFor="icon-button-file">
                <AppButton
                    variant="contained"
                    size="large"
                    color="primary"
                >
                    Save
                </AppButton>
            </label>
                <AppButton color="danger" onClick={() => closeDialog?.()}>
                    Close
                </AppButton>
        </div>

    )
}
















