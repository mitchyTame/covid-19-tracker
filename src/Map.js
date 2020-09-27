import React from 'react'
import './Map.css'
import {Map as LeafletMap, TileLayer} from 'react-leaflet'
import {showDataOnMap} from './util';

function Map({casesType,countries, center, zoom=3}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
             <TileLayer 
             url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
             subdomains={['mt0','mt1','mt2','mt3']}>
                 {/*Loop through countries and draw circles on the screen */}

             </TileLayer>
             {showDataOnMap(countries,casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
