import React from 'react'
import { Grid } from '@material-ui/core'
import DatePicker from '../../../components/DatePicker/DatePicker'

export default function ReportsDateRange({ startDate, onChangeStartDate, endDate, onChangeEndDate }) {
    return (
        <Grid container style={{ padding: "0px 20px", display: "flex", justifyContent: "flex-start", zIndex: 1 }}>
            <Grid item>
                <DatePicker
                    label="Start Date"
                    selected={startDate}
                    onChange={onChangeStartDate}
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    showMonthDropdown
                    startDate={startDate}
                    endDate={endDate}
                />
            </Grid>
            <Grid item className="mt-4 mx-3">
                <p style={{ fontSize: "14px" }}>TO</p>
            </Grid>

            <Grid item>
                <DatePicker
                    label="End Date"
                    selected={endDate}
                    onChange={onChangeEndDate}
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    showMonthDropdown
                    startDate={startDate}
                    endDate={endDate}
                />
            </Grid>
        </Grid>
    )
}
