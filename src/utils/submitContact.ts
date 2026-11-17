import type { ContactFormValues } from './validation';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export class FormNotConfiguredError extends Error {
  constructor() {
    super('The contact form is not connected yet. Please try again later.');
    this.name = 'FormNotConfiguredError';
  }
}

/**
 * Sends an enquiry through Web3Forms (free tier). Resolves only when the service confirms success;
 * otherwise throws an Error whose message is safe to show the visitor.
 */
export async function submitContact(
  values: ContactFormValues,
  options: { accessKey?: string; firmName: string; fetchImpl?: typeof fetch },
): Promise<void> {
  const accessKey = options.accessKey?.trim();
  if (!accessKey) throw new FormNotConfiguredError();

  const doFetch = options.fetchImpl ?? fetch;
  let response: Response;
  try {
    response = await doFetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New enquiry: ${values.service} from ${values.name}`,
        from_name: `${options.firmName} website`,
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: values.service,
        message: values.message,
        botcheck: values.botcheck ?? '',
      }),
    });
  } catch {
    throw new Error('We could not reach the server. Please check your internet connection and try again.');
  }

  let data: { success?: boolean; message?: string } = {};
  try {
    data = await response.json();
  } catch {
    // handled by the generic error below
  }

  if (response.ok && data.success === true) return;
  throw new Error(
    data.message
      ? `Your message was not sent: ${data.message}`
      : 'Your message was not sent because of a server error. Please try again in a few minutes.',
  );
}
