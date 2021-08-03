import { CardContent } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Card } from '@material-ui/core'
import React from 'react'
import emptyBoxImage from '../../assets/images/empty_box.png'
export default function Empty({
    imageOrIcon,
    message
}) {
    return (
        <Card style={{}}>
            <CardContent>
                {imageOrIcon || <img src={emptyBoxImage} alt="empty" style={{width:'20%'}}/>}
                <Typography>{message|| "No records"}</Typography>
            </CardContent>
        </Card>
    )
}
