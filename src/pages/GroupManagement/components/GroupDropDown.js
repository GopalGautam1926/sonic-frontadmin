import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Select } from "@material-ui/core";
import { useStore } from "../../../stores";
import { observer } from "mobx-react-lite";
import { initialGroupDropdownValue } from "../../../constants";

function GroupDropDown({
    formControlProps,
    labelText,
    labelProps,
    inputProps,
    inputLabelProps,
    ...props
}) {
    const { groupStore } = useStore()

    const renderData = () => {
        if (groupStore?.error) {
            return (
                <Select
                    inputProps={{
                        name: 'company',
                        id: 'company-native-simple',
                        ...inputProps
                    }}
                    {...props}
                >
                    <option style={{ cursor: "pointer", color: "red" }} value={null} onClick={() => groupStore?.fetchGroups()} >
                        Error, Click to fetch again
                    </option>
                </Select >
            )
        }
        if (groupStore?.loading) {
            return (
                <Select
                    native
                    inputProps={{
                        name: 'company',
                        id: 'company-native-simple',
                        ...inputProps
                    }}
                    {...props}
                >
                    <option style={{ cursor: "pointer", }} value={null} >Loading...</option>
                </Select>
            )
        }

        return (
            <Select
                native
                inputProps={{
                    name: 'company',
                    id: 'company-native-simple',
                    ...inputProps
                }}
                {...props}
            >
                {
                    groupStore?.getGroups?.map((group) => {
                        return (
                            <option style={{ cursor: "pointer", }} value={group?.name} selected={group?.name === initialGroupDropdownValue ? "selected" : ""}  >
                                {group?.name}
                            </option>
                        )
                    })
                }
            </Select>
        )
    }

    return (
        <FormControl {...formControlProps} fullWidth>
            <InputLabel htmlFor="company-native-simple" {...inputLabelProps}>{labelText}</InputLabel>
            {renderData()}
        </FormControl>
    );
}

export default observer(GroupDropDown)