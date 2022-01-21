import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Select } from "@material-ui/core";
import { useStore } from "../../../stores";
import { observer } from "mobx-react-lite";

function GroupDropDown({
    formControlProps,
    labelText,
    labelProps,
    inputProps,
    inputLabelProps,
    selectedValue,
    onChangeGroup,
    value,
    loading,
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
        if (groupStore?.loading || loading) {
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
                onChange={(e) => {
                    onChangeGroup(e.target.value)
                }}
                value={value}
                {...props}
            >
                <option style={{ cursor: "pointer" }} value={""}>None</option>
                {
                    groupStore?.getGroups?.map((group) => {
                        return (
                            <option
                                style={{ cursor: "pointer" }}
                                value={group?._id}
                                selected={group?._id == value ? "selected" : ""}
                            >
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
            <InputLabel shrink htmlFor="company-native-simple" {...inputLabelProps}>{labelText}</InputLabel>
            {renderData()}
        </FormControl>
    );
}

export default observer(GroupDropDown)