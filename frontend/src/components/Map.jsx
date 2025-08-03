import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import GeoCoderMarker from './GeoCoderMarker'

const Map = ({ address, city, country }) => {
  return (
    <MapContainer
    center={[53.35, 18.8]}
    zoom={1}
    scrollWheelZoom={false}
    className='h-[24rem] w-full mt-5 z-0'
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
      <GeoCoderMarker address={`${address} ${city} ${country}`} />
    </MapContainer>
  )
}

export default Map