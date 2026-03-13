// === TIPOS PRINCIPALES DE LA GUÍA DE CAZORLA ===

export interface Coordinates {
  lat: number;
  lng: number;
}

// Puntos de interés (Qué Ver)
export interface PointOfInterest {
  id: string;
  name: string;
  slug: string;
  category: "monumento" | "naturaleza" | "mirador" | "pueblo" | "museo" | "religioso" | "otro";
  description: string;
  shortDescription: string;
  images: string[];
  coordinates: Coordinates;
  audioUrl?: string;
  videoUrl?: string;
  openingHours?: string;
  price?: string;
  tags: string[];
  featured: boolean;
}

// Rutas y Senderos
export interface Trail {
  id: string;
  name: string;
  slug: string;
  type: "senderismo" | "bicicleta" | "4x4" | "caballo" | "acuatica";
  difficulty: "facil" | "media" | "dificil" | "experto";
  distance: number; // km
  duration: number; // minutos
  elevationGain: number; // metros
  description: string;
  shortDescription: string;
  images: string[];
  startPoint: Coordinates;
  endPoint: Coordinates;
  waypoints: Coordinates[];
  highlights: string[];
  warnings?: string[];
  permit: boolean;
  permitInfo?: string;
  season: string[];
  tags: string[];
  featured: boolean;
}

// Audioguías
export interface AudioGuide {
  id: string;
  name: string;
  slug: string;
  description: string;
  audioUrl: string;
  duration: number; // segundos
  image: string;
  coordinates: Coordinates;
  geofenceRadius: number; // metros
  order: number;
  transcript?: string;
}

// Actividades
export interface Activity {
  id: string;
  name: string;
  slug: string;
  category: "aventura" | "naturaleza" | "cultural" | "gastronomia" | "familiar" | "acuatica";
  description: string;
  shortDescription: string;
  images: string[];
  provider: string;
  phone?: string;
  email?: string;
  website?: string;
  price: string;
  duration: string;
  schedule: string;
  minAge?: number;
  maxPeople?: number;
  coordinates?: Coordinates;
  bookingUrl?: string;
  tags: string[];
  featured: boolean;
}

// Alojamientos
export interface Accommodation {
  id: string;
  name: string;
  slug: string;
  type: "hotel" | "casa-rural" | "apartamento" | "camping" | "hostal" | "glamping";
  stars?: number;
  description: string;
  shortDescription: string;
  images: string[];
  address: string;
  coordinates: Coordinates;
  phone: string;
  email?: string;
  website?: string;
  priceRange: string;
  amenities: string[];
  bookingUrl?: string;
  petFriendly: boolean;
  accessible: boolean;
  featured: boolean;
}

// Eventos
export interface Event {
  id: string;
  name: string;
  slug: string;
  category: "fiesta" | "cultural" | "deportivo" | "gastronomico" | "religioso" | "mercado" | "otro";
  description: string;
  shortDescription: string;
  images: string[];
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  coordinates?: Coordinates;
  price?: string;
  organizer?: string;
  featured: boolean;
}

// Servicios e Info de Interés
export interface Service {
  id: string;
  name: string;
  category: "farmacia" | "emergencia" | "transporte" | "salud" | "administracion" | "gasolinera" | "cajero" | "parking" | "wifi" | "oficina-turismo";
  address: string;
  phone?: string;
  coordinates?: Coordinates;
  openingHours?: string;
  notes?: string;
  isEmergency: boolean;
}

// El Tiempo
export interface WeatherData {
  date: string;
  tempMax: number;
  tempMin: number;
  condition: "soleado" | "nublado" | "lluvia" | "tormenta" | "nieve" | "niebla" | "parcialmente-nublado";
  humidity: number;
  windSpeed: number;
  uvIndex: number;
}

// Navegación
export type TabId = "inicio" | "que-ver" | "rutas" | "audioguia" | "actividades" | "alojamientos" | "eventos" | "tiempo" | "info";

export interface TabConfig {
  id: TabId;
  label: string;
  icon: string;
}
