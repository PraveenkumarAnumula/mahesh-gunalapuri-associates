import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../../src/App';
import ContactForm from '../../src/components/sections/ContactForm';
import DueDatesPanel from '../../src/components/sections/DueDatesPanel';

function renderAt(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

function renderForm(props: Partial<React.ComponentProps<typeof ContactForm>> = {}) {
  return render(
    <MemoryRouter>
      <ContactForm {...props} />
    </MemoryRouter>,
  );
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), 'Test Person');
  await user.type(screen.getByLabelText(/phone number/i), '98765 43210');
  await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
  await user.selectOptions(screen.getByLabelText(/service required/i), 'GST Services');
  await user.type(screen.getByLabelText(/^message/i), 'Need help with monthly GST returns.');
  await user.click(screen.getByLabelText(/agree to be contacted/i));
}

describe('pages', () => {
  it.each([
    ['/', /your trusted partner in taxation/i],
    ['/about', /about ams tax associates/i],
    ['/ca-profile', /CA \[Founder Name\]/],
    ['/services', /services for individuals/i],
    ['/expertise', /areas of professional expertise/i],
    ['/insights', /updates, reminders and practical guidance/i],
    ['/insights/advance-tax-instalments-explained', /advance tax instalments/i],
    ['/contact', /request a consultation/i],
    ['/privacy-policy', /privacy policy/i],
    ['/terms', /terms & conditions/i],
    ['/this-page-does-not-exist', /couldn’t find that page/i],
    ['/insights/unknown-article', /couldn’t find that page/i],
  ])('renders %s', async (path, heading) => {
    renderAt(path);
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });

  it('marks placeholder statistics as sample figures', () => {
    renderAt('/');
    expect(screen.getAllByText('Sample figure').length).toBeGreaterThanOrEqual(2);
  });

  it('labels demo articles', async () => {
    renderAt('/insights');
    expect((await screen.findAllByText('Demonstration content')).length).toBeGreaterThan(0);
  });

  it('filters articles by category', async () => {
    const user = userEvent.setup();
    renderAt('/insights');
    await user.click(await screen.findByRole('button', { name: 'GST Notifications' }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'GST Notifications' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('keeps WhatsApp disabled until a number is configured', async () => {
    renderAt('/contact');
    expect(await screen.findByRole('button', { name: /whatsapp/i })).toBeDisabled();
  });

  it('preselects the service passed in the URL', async () => {
    renderAt('/contact?service=GST%20Services');
    expect(await screen.findByLabelText(/service required/i)).toHaveValue('GST Services');
  });
});

describe('mobile menu', () => {
  it('opens, exposes links and closes with Escape', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    const menu = screen.getByRole('navigation', { name: 'Mobile' });
    expect(within(menu).getByRole('link', { name: 'Insights' })).toHaveAttribute('href', '/insights');
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument());
  });
});

describe('ContactForm', () => {
  it('shows required-field errors and does not submit', async () => {
    const user = userEvent.setup();
    const fetchImpl = vi.fn();
    renderForm({ accessKey: 'key', fetchImpl });
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));
    expect(await screen.findByText(/enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/choose the service/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('validates email and Indian phone formats', async () => {
    const user = userEvent.setup();
    renderForm({ accessKey: 'key', fetchImpl: vi.fn() });
    await user.type(screen.getByLabelText(/email address/i), 'wrong@');
    await user.type(screen.getByLabelText(/phone number/i), '12345');
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/valid 10-digit indian mobile/i)).toBeInTheDocument();
  });

  it('shows a loading state, then success only after the service confirms', async () => {
    const user = userEvent.setup();
    let resolve!: (r: Response) => void;
    const fetchImpl = vi.fn(() => new Promise<Response>((r) => (resolve = r)));
    renderForm({ accessKey: 'key', fetchImpl });
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));
    const busy = await screen.findByRole('button', { name: /sending/i });
    expect(busy).toBeDisabled();
    expect(screen.queryByText(/enquiry has been sent/i)).not.toBeInTheDocument();
    resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
    expect(await screen.findByText(/enquiry has been sent/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
  });

  it('shows the error when the service rejects the submission', async () => {
    const user = userEvent.setup();
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false, message: 'Rate limited' }), { status: 429 }));
    renderForm({ accessKey: 'key', fetchImpl });
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Rate limited');
    expect(screen.queryByText(/enquiry has been sent/i)).not.toBeInTheDocument();
  });

  it('explains that the form is not connected when no key is set', async () => {
    const user = userEvent.setup();
    renderForm({ accessKey: '' });
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/not connected yet/i);
  });
});

describe('DueDatesPanel', () => {
  it('lists upcoming due dates relative to the given day', () => {
    render(<DueDatesPanel date={new Date(2026, 10, 17)} />);
    expect(screen.getByText('GSTR-3B (monthly filers)')).toBeInTheDocument();
    expect(screen.getByText('in 3 days')).toBeInTheDocument();
  });
});
