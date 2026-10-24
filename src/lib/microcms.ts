import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

export const client = (serviceDomain && apiKey)
  ? createClient({ serviceDomain, apiKey })
  : null;
