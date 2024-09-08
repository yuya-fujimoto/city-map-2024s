import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getCityData } from '../data';
import { Map } from '../components/map';
import invariant from 'tiny-invariant';
import { ClientOnly } from 'remix-utils/client-only';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.dataId, 'Missing dataId param');
  const cityData = await getCityData(params.dataId);

  const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;
  if (!cityData || !mapboxAccessToken) {
    throw new Response('Not Found', { status: 404 });
  }
  if (cityData.length !== 1) {
    throw new Response('Bad Request', { status: 400 });
  }
  return json({ cityData: cityData[0], mapboxAccessToken });
};

export default function CityData() {
  const { cityData, mapboxAccessToken } = useLoaderData<typeof loader>();

  return (
    <div id="contact">
      <ClientOnly fallback={<>Loading...</>}>
        {() => (
          <Map cityDataId={cityData.id} mapboxAccessToken={mapboxAccessToken} />
        )}
      </ClientOnly>
    </div>
  );
}
