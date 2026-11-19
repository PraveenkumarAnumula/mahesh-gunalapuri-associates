import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../../src/App';
import ContactForm from '../../src/components/sections/ContactForm';
import KeyDatesPanel from '../../src/components/sections/KeyDatesPanel';

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
  await user.selectOptions(screen.getByLabelText(/service required/i), 'GST Registrations & Return Filings');
  await user.type(screen.getByLabelText(/^message/i), 'Need help with monthly GST returns.');
}

describe('pages', () => {
  it.each([
    ['/', /professional services in taxation, accounting and regulatory compliance/i],
    ['/about', /about mahesh gunalapuri & associates/i],
    ['/ca-profile', /CA Mahesh Gunalapuri/],
    ['/services', /services for individuals/i],
    ['/expertise', /areas of professional practice/i],
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

  it('shows the track-record figures without sample labels', () => {
    renderAt('/');
    expect(screen.getByText('ITR Filings')).toBeInTheDocument();
    expect(screen.queryByText('Sample figure')).not.toBeInTheDocument();
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

  it('links WhatsApp, phone and email to the configured details', async () => {
    renderAt('/contact');
    expect(await screen.findByRole('link', { name: /chat on whatsapp/i })).toHaveAttribute('href', expect.stringContaining('https://wa.me/919347944995'));
    expect(screen.getAllByRole('link', { name: '93479 44995' })[0]).toHaveAttribute('href', 'tel:+919347944995');
    expect(screen.getAllByRole('link', { name: '90595 96977' })[0]).toHaveAttribute('href', 'tel:+919059596977');
    expect(screen.getAllByRole('link', { name: 'camaheshgunalapuri@gmail.com' })[0]).toHaveAttribute('href', expect.stringContaining('mailto:camaheshgunalapuri@gmail.com'));
  });

  it('preselects the service passed in the URL', async () => {
    renderAt('/contact?service=Food%20License%20(FSSAI)');
    expect(await screen.findByLabelText(/service required/i)).toHaveValue('Food License (FSSAI)');
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

describe('ContactForm (no server: opens email app or WhatsApp)', () => {
  it('shows required-field errors and opens nothing', async () => {
    const user = userEvent.setup();
    const openLink = vi.fn();
    renderForm({ openLink });
    await user.click(screen.getByRole('button', { name: /send by email/i }));
    expect(await screen.findByText(/enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/choose the service/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(openLink).not.toHaveBeenCalled();
  });

  it('validates email and Indian phone formats', async () => {
    const user = userEvent.setup();
    renderForm({ openLink: vi.fn() });
    await user.type(screen.getByLabelText(/email address/i), 'wrong@');
    await user.type(screen.getByLabelText(/phone number/i), '12345');
    await user.click(screen.getByRole('button', { name: /send by email/i }));
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/valid 10-digit indian mobile/i)).toBeInTheDocument();
  });

  it('opens a pre-filled email to the firm and explains the next step', async () => {
    const user = userEvent.setup();
    const openLink = vi.fn();
    renderForm({ openLink });
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send by email/i }));
    expect(openLink).toHaveBeenCalledTimes(1);
    const [href, channel] = openLink.mock.calls[0];
    expect(channel).toBe('email');
    expect(href).toMatch(/^mailto:camaheshgunalapuri@gmail\.com\?subject=/);
    expect(decodeURIComponent(href)).toContain('Name: Test Person');
    expect(decodeURIComponent(href)).toContain('Need help with monthly GST returns.');
    expect(await screen.findByText(/press send there/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open the email again/i })).toHaveAttribute('href', href);
  });

  it('opens a pre-filled WhatsApp chat with the firm', async () => {
    const user = userEvent.setup();
    const openLink = vi.fn();
    renderForm({ openLink });
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send on whatsapp/i }));
    const [href, channel] = openLink.mock.calls[0];
    expect(channel).toBe('whatsapp');
    expect(href).toMatch(/^https:\/\/wa\.me\/919347944995\?text=/);
    expect(decodeURIComponent(href)).toContain('Service required: GST Registrations & Return Filings');
  });
});

describe('KeyDatesPanel', () => {
  it('shows fixed due dates with no live data', () => {
    render(<KeyDatesPanel />);
    expect(screen.getByText('GSTR-3B')).toBeInTheDocument();
    expect(screen.getByText('20th')).toBeInTheDocument();
    expect(screen.queryByText(/live/i)).not.toBeInTheDocument();
  });
});

describe('footer copyright year', () => {
  afterEach(() => vi.useRealTimers());

  it('shows the founding year while it is still that year', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 10, 18));
    renderAt('/');
    expect(await screen.findByText(/© 2026 Mahesh Gunalapuri & Associates/)).toBeInTheDocument();
  });

  it('extends to the current year automatically, with no rebuild', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2028, 0, 5));
    renderAt('/');
    expect(await screen.findByText(/© 2026–2028 Mahesh Gunalapuri & Associates/)).toBeInTheDocument();
  });
});
