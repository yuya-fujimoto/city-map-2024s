import MapGl from 'react-map-gl';
import { DeckGL } from '@deck.gl/react';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { useToast } from '~/hooks/use-toast';

const glConfig: Record<
  'nyc' | 'sf',
  {
    initialViewState: {
      longitude: number;
      latitude: number;
      zoom: number;
    };
    data: string;
    getPosition: (d: any) => [number, number];
    toastTitle: string;
  }
> = {
  nyc: {
    data: 'https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=50000&boroname=Manhattan',
    getPosition: (d) => {
      return [d.the_geom.coordinates[0], d.the_geom.coordinates[1]];
    },
    initialViewState: {
      longitude: -74.0104826,
      latitude: 40.7454851,
      zoom: 11,
    },
    toastTitle: 'Visualization data is now NYC',
  },
  sf: {
    data: 'https://data.sfgov.org/resource/5kya-mfst.json?$limit=1000',
    getPosition: (d) => {
      return [d.polygon.coordinates[0][0][0], d.polygon.coordinates[0][0][1]];
    },
    initialViewState: {
      longitude: -122.4194,
      latitude: 37.7749,
      zoom: 11,
    },
    toastTitle: 'Visualization data is now SF',
  },
};

export function Map({
  mapboxAccessToken,
  cityDataId,
}: {
  mapboxAccessToken: string;
  cityDataId: 'nyc' | 'sf';
}) {
  const selectedConfig = glConfig[cityDataId];
  const { toast } = useToast();

  const layers = [
    new HexagonLayer<any>({
      id: 'heatmap',
      data: selectedConfig.data,
      elevationRange: [0, 3000],
      extruded: true,
      getPosition: selectedConfig.getPosition,
      pickable: true,
      radius: 50,
      material: {
        ambient: 0.64,
        diffuse: 0.6,
        shininess: 32,
        specularColor: [51, 51, 51],
      },
      transitions: {
        elevationScale: 3000,
      },
      onDataLoad: () => {
        toast({
          title: selectedConfig.toastTitle,
          description: 'The data has been loaded successfully',
        });
      },
    }),
  ];

  return (
    <DeckGL
      initialViewState={selectedConfig.initialViewState}
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
