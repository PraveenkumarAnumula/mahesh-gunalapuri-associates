export default function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="container-page flex min-h-[50vh] items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-navy-100 border-t-navy-900" aria-hidden="true" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}
