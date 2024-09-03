import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useFetcher, useLoaderData } from '@remix-run/react';
import type { FunctionComponent } from 'react';

import { getContact, updateContact, type ContactRecord } from '../data';
import { Map } from '../components/map';
import invariant from 'tiny-invariant';
import { ClientOnly } from 'remix-utils/client-only';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, 'Missing contactId param');
  const contact = await getContact(params.contactId);

  const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;
  if (!contact) {
    throw new Response('Not Found', { status: 404 });
  }
  return json({ contact, mapboxAccessToken });
};

export default function Contact() {
  const { contact, mapboxAccessToken } = useLoaderData<typeof loader>();

  return (
    <div id="contact">
      <ClientOnly fallback={<>Loading...</>}>
        {() => <Map mapboxAccessToken={mapboxAccessToken} />}
      </ClientOnly>
    </div>
  );
}
