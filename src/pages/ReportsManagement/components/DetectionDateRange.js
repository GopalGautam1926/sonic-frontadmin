import React from 'react'
import { Grid } from '@material-ui/core'
import DatePicker from '../../../components/DatePicker/DatePicker'
import { useStore } from '../../../stores'

export default function DetectionDateRange() {
    const { reportsdetection } = useStore();

    return (
        <Grid container style={{ padding: "0px 20px", display: "flex", justifyContent: "flex-end", zIndex: 1 }}>
            <Grid item>
                <DatePicker
                    label="Start Date"
                    selected={reportsdetection?.getDateRange?.startDate}
                    onChange={(date) => reportsdetection?.changeDateRange({ ...reportsdetection?.getDateRange, startDate: date })}
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    showMonthDropdown
                    startDate={reportsdetection?.getDateRange?.startDate}
                    endDate={reportsdetection?.getDateRange?.endDate}
                />
            </Grid>
            <Grid item className="mt-4 mx-3">
                <p style={{ fontSize: "14px" }}>TO</p>
            </Grid>

            <Grid item>
                <DatePicker
                    label="End Date"
                    selected={reportsdetection?.getDateRange?.endDate}
                    onChange={(date) => reportsdetection?.changeDateRange({ ...reportsdetection?.getDateRange, endDate: date })}
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    showMonthDropdown
                    startDate={reportsdetection?.getDateRange?.startDate}
                    endDate={reportsdetection?.getDateRange?.endDate}
                />
            </Grid>
        </Grid>
    )
}
