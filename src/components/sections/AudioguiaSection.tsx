"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { audioGuides } from "@/data";
import { AudioGuide } from "@/lib/types";

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

function formatDuration(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const seg = seconds % 60;
  if (min === 0) return `${seg} seg`;
  if (seg === 0) return `${min} min`;
  return `${min} min ${seg} seg`;
}

export default function AudioguiaSection() {
  const [gpsActive, setGpsActive] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const activateGPS = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGpsActive(true);
      },
      (error) => {
        console.error("Error GPS:", error);
        alert("No se pudo acceder a tu ubicación. Comprueba los permisos.");
      },
      { enableHighAccuracy: true, maximumAge: 5000 }
    );

    watchIdRef.current = id;
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const sortedGuides = [...audioGuides].sort((a, b) => {
    if (gpsActive && userLocation) {
      const distA = haversineDistance(
        userLocation.lat,
        userLocation.lng,
        a.coordinates.lat,
        a.coordinates.lng
      );
      const distB = haversineDistance(
        userLocation.lat,
        userLocation.lng,
        b.coordinates.lat,
        b.coordinates.lng
      );
      return distA - distB;
    }
    return a.order - b.order;
  });

  const playingGuide = currentlyPlaying
    ? audioGuides.find((g) => g.id === currentlyPlaying) ?? null
    : null;

  const handlePlay = (guide: AudioGuide) => {
    setCurrentlyPlaying(guide.id);
    setPlaybackRate(1);
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentlyPlaying(null);
  };

  return (
    <div className={`pb-24 ${playingGuide ? "pb-56" : ""}`}>
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4 px-4 pt-4">
        Audioguía de Cazorla
      </h2>

      {/* Info banner */}
      <div className="mx-4 mb-5 bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-sm text-green-800 mb-3">
          Activa el GPS para recibir audioguías automáticamente al acercarte a
          los puntos de interés
        </p>
        <button
          onClick={activateGPS}
          disabled={gpsActive}
          className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
            gpsActive
              ? "bg-green-200 text-green-800 cursor-default"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {gpsActive ? "📍 GPS Activo" : "📍 Activar GPS"}
        </button>
      </div>

      {/* Guide list */}
      <div className="flex flex-col gap-3 px-4">
        {sortedGuides.map((guide) => {
          const distance =
            gpsActive && userLocation
              ? haversineDistance(
                  userLocation.lat,
                  userLocation.lng,
                  guide.coordinates.lat,
                  guide.coordinates.lng
                )
              : null;

          const isPlaying = currentlyPlaying === guide.id;

          return (
            <div
              key={guide.id}
              className={`bg-white rounded-xl shadow-sm border p-4 transition-colors ${
                isPlaying ? "border-green-400 bg-green-50/50" : "border-gray-100"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Order number circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                    isPlaying
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {guide.order}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900">{guide.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>🎧 {formatDuration(guide.duration)}</span>
                    {distance !== null && (
                      <span className="text-green-600 font-medium">
                        📍 A {formatDistance(distance)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1.5">
                    {guide.description}
                  </p>
                </div>

                {/* Play button */}
                <button
                  onClick={() =>
                    isPlaying ? handleStop() : handlePlay(guide)
                  }
                  className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isPlaying
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                  }`}
                >
                  <span className="text-lg">{isPlaying ? "⏹" : "▶️"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Audio player - fixed at bottom above nav */}
      {playingGuide && (
        <div className="fixed bottom-16 left-0 right-0 z-40 bg-gradient-to-t from-green-800 to-green-700 text-white shadow-2xl border-t border-green-600">
          <div className="px-4 pt-3 pb-2">
            {/* Header row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🎧</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm truncate">
                    {playingGuide.name}
                  </h4>
                  <p className="text-xs text-green-200">
                    {formatDuration(playingGuide.duration)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleStop}
                className="w-8 h-8 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Audio element */}
            <audio
              ref={audioRef}
              src={playingGuide.audioUrl}
              autoPlay
              controls
              className="w-full h-10 mb-2 [&::-webkit-media-controls-panel]:bg-green-600 rounded-lg"
              onEnded={handleStop}
            />

            {/* Playback speed buttons */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-green-200 mr-1">Velocidad:</span>
              {[0.75, 1, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setPlaybackRate(rate)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    playbackRate === rate
                      ? "bg-white text-green-800"
                      : "bg-green-600 text-green-100 hover:bg-green-500"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
