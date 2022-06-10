import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Select } from "@material-ui/core";
import { useStore } from "../../../stores";
import { observer } from "mobx-react-lite";

function PartnerDropDown({
    formControlProps,
    labelText,
    labelProps,
    inputProps,
    inputLabelProps,
    ...props
}) {
    const { partnerStore } = useStore()

    const renderData = () => {
        if (partnerStore?.error) {
            return (
                <Select
                    inputProps={{
                        name: 'partner',
                        id: 'partner-native-simple',
                        ...inputProps
                    }}
                    {...props}
                >
                    <option style={{ cursor: "pointer", color: "red" }} value={null} onClick={() => partnerStore?.fetchPartners()} >
                        Error, Click to fetch again
                    </option>
                </Select >
            )
        }
        if (partnerStore?.loading) {
            return (
                <Select
                    native
                    inputProps={{
                        name: 'partner',
                        id: 'partner-native-simple',
                        ...inputProps
                    }}
                    {...props}
                >
                    <option style={{ cursor: "pointer" }} value={null} >Loading...</option>
                </Select>
            )
        }
        return (
            <Select
                native
                inputProps={{
                    name: 'partner',
                    id: 'partner-native-simple',
                    ...inputProps
                }}
                {...props}
            >
                <option style={{ cursor: "pointer" }} value={""} >None</option>
                {
                    partnerStore?.getPartner?.docs?.map((partner) => {
                        return (
                            <option style={{ cursor: "pointer", }} value={partner?._id}>{partner?.name}</option>
                        )
                    })
                }
            </Select>
        )
    }

    return (
        <FormControl {...formControlProps} fullWidth>
            <InputLabel shrink htmlFor="partner-native-simple" {...inputLabelProps}>{labelText}</InputLabel>
            {renderData()}
        </FormControl>
    );
}

export default observer(PartnerDropDown)