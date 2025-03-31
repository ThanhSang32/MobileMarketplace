
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-19'
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
