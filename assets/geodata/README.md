# Geodata — Guía para Agregar Rutas de Microbus

## Estructura del Archivo

El archivo `routes.json` es una **FeatureCollection** que contiene dos tipos de features:

| `feature_type` | Geometría | Descripción |
|---|---|---|
| `"route"` | `LineString` | El trayecto de una ruta de microbus |
| `"stop"` | `Point` | Una parada de microbus |

---

## Cómo Agregar una Nueva Ruta

### 1. Agrega el Feature de tipo `route`

```json
{
  "type": "Feature",
  "id": "route-XXX",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-116.XXXX, 31.XXXX],
      [-116.XXXX, 31.XXXX]
    ]
  },
  "properties": {
    "feature_type": "route",
    "route_id": "XXX",
    "route_short_name": "XXX",
    "route_long_name": "Nombre Largo de la Ruta",
    "route_color": "#HEXCOLOR",
    "route_text_color": "#HEXCOLOR",
    "route_type": "microbus"
  }
}
```

**Campos obligatorios:**
- `route_id`: Identificador único (ej: `"104"`)
- `route_color`: Color hex de la línea en el mapa (ej: `"#EF4444"`)
- `route_text_color`: Color del texto sobre ese fondo

### 2. Agrega las paradas de la ruta

Para cada parada, verifica si ya existe en el archivo (por `stop_id`). Si existe, solo agrega el `route_id` al array `routes`. Si no existe, crea el feature:

```json
{
  "type": "Feature",
  "id": "stop-STXXX",
  "geometry": {
    "type": "Point",
    "coordinates": [-116.XXXX, 31.XXXX]
  },
  "properties": {
    "feature_type": "stop",
    "stop_id": "STXXX",
    "stop_name": "Nombre de la Parada",
    "stop_description": "Descripción opcional",
    "routes": ["XXX"]
  }
}
```

---

## Cómo Obtener Coordenadas GPS

- **Google Maps**: Click derecho sobre el punto → copia coordenadas. Las muestra como `lat, lng`; **en GeoJSON el orden es `[lng, lat]`**.
- **GPS Field App**: Graba el recorrido y exporta como GPX → convertir a GeoJSON con [geojson.io](https://geojson.io).
- **QGIS**: Si tienes archivos KML o Shapefile del municipio.

---

## Colores Recomendados para las Rutas

Usa colores con buen contraste entre sí para que sean distinguibles en el mapa:

| route_color | route_text_color | Nombre |
|---|---|---|
| `#34D399` | `#065F46` | Verde esmeralda |
| `#F59E0B` | `#78350F` | Naranja ámbar |
| `#818CF8` | `#1E1B4B` | Índigo |
| `#F87171` | `#7F1D1D` | Rojo coral |
| `#38BDF8` | `#0C4A6E` | Azul cielo |
| `#A78BFA` | `#2E1065` | Violeta |
| `#FB923C` | `#7C2D12` | Naranja |

---

## Migración a API

Cuando el backend esté listo, el hook `useRoutesData` puede cambiar de cargar el archivo local a hacer fetch a la API. El archivo `routes.json` servirá como **cache offline** automático.

El campo a cambiar es únicamente `DATA_SOURCE_URL` en `hooks/useRoutesData.ts`.
