import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Select } from "@material-ui/core";
import { useStore } from "../../../stores";
import { observer } from "mobx-react-lite";
import { initialCompanyDropdownValue } from "../../../constants";

function CompanyDropDown({
    formControlProps,
    labelText,
    labelProps,
    inputProps,
    inputLabelProps,
    ...props
}) {
    const { companyStore } = useStore()

    const renderData = () => {
        if (companyStore?.error) {
            return (
                <Select
                    inputProps={{
                        name: 'company',
                        id: 'company-native-simple',
                        ...inputProps
                    }}
                    {...props}
                >
                    <option style={{ cursor: "pointer", color: "red" }} value={null} onClick={() => companyStore?.fetchCompanies()} >
                        Error, Click to fetch again
                    </option>
                </Select >
            )
        }
        if (companyStore?.loading) {
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
                <option style={{ cursor: "pointer", }} value={initialCompanyDropdownValue} >None</option>
                {
                    companyStore?.getCompany?.map((company) => {
                        return (
                            <option style={{ cursor: "pointer", }} value={company?._id}>{company?.name}</option>
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

export default observer(CompanyDropDown)