import * as React from 'react';
import MapGl from 'react-map-gl';
import { DeckGL } from '@deck.gl/react';
import { HexagonLayer } from '@deck.gl/aggregation-layers';

export function Map({ mapboxAccessToken }: { mapboxAccessToken: string }) {
  const layers = [
    new HexagonLayer<any>({
      id: 'heatmap',
      // colorRange,
      // coverage,
      data: 'https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=1000&boroname=Manhattan',
      elevationRange: [0, 3000],
      // elevationScale: data && data.length ? 50 : 0,
      extruded: true,
      getPosition: (d) => {
        return [d.the_geom.coordinates[0], d.the_geom.coordinates[1]];
      },
      pickable: true,
      // radius,
      // upperPercentile,
      material: {
        ambient: 0.64,
        diffuse: 0.6,
        shininess: 32,
        specularColor: [51, 51, 51],
      },

      transitions: {
        elevationScale: 3000,
      },
    }),
  ];

  return (
    <DeckGL
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      controller={true}
      layers={layers}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <MapGl
        mapboxAccessToken={mapboxAccessToken}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      />
    </DeckGL>
  );
}
