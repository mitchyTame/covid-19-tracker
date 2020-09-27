import React from 'react';
import numeral from "numeral";
import {Circle, Popup} from 'react-leaflet';

export const sortData = (data) => {
    const sortedData = [...data]
    
    return sortedData.sort((a,b) => a.cases > b.cases ? -1: 1);
}

const casesTypeColors ={
    casesPerOneMillion: {
        hex:"#CC1034",
        multiplier: 1500,
    },
    recoveredPerOneMillion: {
        hex:"#7dd71d",
        multiplier: 1500
    },
    deathsPerOneMillion: {
        hex: "#000000",
        multiplier:1500
    }
}

//Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType='cases') => (
    data.map(country => (
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag" style={{backgroundImage: `url(${country.countryInfo.flag})`}}/>  
                    <div className="info-name">{country.country}</div>
                    <div className="info-population">Total Population: {numeral(country.population).format("0,0")}</div>
                    <div className="info-cases">Cases per million: {numeral(country.casesPerOneMillion).format("0,0")} </div>
                    <div className="info-recovered">Recovered per million: {numeral(country.recoveredPerOneMillion).format("0,0")}</div>
                    <div className="info-deaths">Deaths per million: {numeral(country.deathsPerOneMillion).format("0,0")}</div>
                    <div className="info-"></div>
                </div>
            </Popup>
        </Circle>
        
    ))
);

export const prettyPrintStat = (stat) => 
    stat ? `+${numeral(stat).format("0,0a")}` : '+0'
