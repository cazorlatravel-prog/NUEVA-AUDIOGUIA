"use client";

import { useEffect, useState } from "react";
import type { Coordinates } from "@/lib/types";

interface MapMarker {
  id: string;
  position: Coordinates;
  title: string;
  description?: string;
  emoji?: string;
  onClick?: () => void;
}

interface MapViewProps {
  center: Coordinates;
  zoom?: number;
  markers?: MapMarker[];
  waypoints?: Coordinates[];
  userLocation?: Coordinates | null;
  height?: string;
  className?: string;
}

export default function MapView({ center, zoom = 13, markers = [], waypoints = [], userLocation, height = "400px", className = "" }: MapViewProps) {
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    Promise.all([
      import("react-leaflet"),
      import("leaflet"),
    ]).then(([rl, L]) => {
      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
      setMapComponents({ rl, L });
    });
  }, []);

  if (!MapComponents) {
    return (
      <div style={{ height }} className={`bg-gray-100 rounded-xl flex items-center justify-center ${className}`}>
        <span className="text-gray-400">Cargando mapa...</span>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } = MapComponents.rl;
  const L = MapComponents.L;

  const createEmojiIcon = (emoji: string) => {
    return L.divIcon({
      html: `<div style="font-size:24px;text-align:center;line-height:1">${emoji}</div>`,
      className: "emoji-marker",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
      <style>{`.emoji-marker { background: none !important; border: none !important; }`}</style>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ height, width: "100%" }}
        className={`rounded-xl z-0 ${className}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.position.lat, marker.position.lng]}
            icon={marker.emoji ? createEmojiIcon(marker.emoji) : undefined}
            eventHandlers={marker.onClick ? { click: marker.onClick } : undefined}
          >
            <Popup>
              <div className="text-sm">
                <strong>{marker.title}</strong>
                {marker.description && <p className="mt-1 text-gray-600">{marker.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
        {waypoints.length > 1 && (
          <Polyline
            positions={waypoints.map((w) => [w.lat, w.lng])}
            color="#1b6b3a"
            weight={4}
            opacity={0.8}
          />
        )}
        {userLocation && (
          <CircleMarker
            center={[userLocation.lat, userLocation.lng]}
            radius={8}
            fillColor="#3b82f6"
            fillOpacity={1}
            color="#ffffff"
            weight={3}
          />
        )}
      </MapContainer>
    </>
  );
}
