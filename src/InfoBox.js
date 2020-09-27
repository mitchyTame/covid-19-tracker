import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core'
import './InfoBox.css'

function InfoBox({active,isRed, isBlack, title, cases, total, ...props}) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} ${isBlack && "infoBox--black"}`}>
            <CardContent>
                {/* Title */}
                <Typography class="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                {/* +120k Number of cases*/}
                <h2 className={`${(!isRed && !isBlack) && "infoBox--green"} ${isRed && 'infoBox--red'}`}>{cases}</h2>
                {/* 1.2M Total */}
                <Typography class="infoBox__total"color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
