"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const centerUptx = [19.233008228934594, -98.23890546911508];
const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      center={
        (centerUptx as L.LatLngExpression) || [
          19.233008228934594, -98.23890546911508,
        ]
      }
      zoom={centerUptx ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url={url} attribution={attribution} />
      {centerUptx && <Marker position={centerUptx as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;
