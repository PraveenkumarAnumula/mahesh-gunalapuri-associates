export const SITE_URL = ((import.meta.env.VITE_SITE_URL as string | undefined) || 'https://ams-tax-associates.netlify.app').replace(
  /\/$/,
  '',
);
export const WEB3FORMS_ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ?? '';
