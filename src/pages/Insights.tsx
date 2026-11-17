import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import { formatDate } from '../utils/format';
import { articleCategories, sortedArticles, type ArticleCategory } from '../content/articles';


export default function Insights() {
  const [params, setParams] = useSearchParams();
  const active = params.get('category') as ArticleCategory | null;
  const list = active ? sortedArticles.filter((a) => a.category === active) : sortedArticles;

  const select = (c: ArticleCategory | null) => {
    const next = new URLSearchParams(params);
    if (c) next.set('category', c);
    else next.delete('category');
    setParams(next, { replace: true });
  };

  const chip = (selected: boolean) =>
    `whitespace-nowrap rounded-full border px-3.5 py-2 text-[14px] transition-colors ${
      selected ? 'border-navy-900 bg-navy-900 text-white' : 'border-line bg-white text-slate hover:border-navy-700 hover:text-navy-900'
    }`;

  return (
    <>
      <Seo
        title="Insights — Tax Updates, GST and Compliance Reminders"
        description="Articles on income tax updates, GST, financial planning, compliance reminders and business advisory from Mahesh Gunalapuri & Associates."
      />
      <PageHeader
        eyebrow="Insights"
        title="Updates, reminders and practical guidance"
        intro="Short, plain-language articles on tax, GST and compliance topics."
        crumbs={[{ label: 'Insights' }]}
      />
      <section aria-label="Articles" className="py-14 sm:py-16">
        <div className="container-page flex flex-col gap-10">
          <div role="group" aria-label="Filter articles by category" className="swipe-row sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <button type="button" className={chip(!active)} aria-pressed={!active} onClick={() => select(null)}>All</button>
            {articleCategories.map((c) => (
              <button key={c} type="button" className={chip(active === c)} aria-pressed={active === c} onClick={() => select(c)}>
                {c}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <p className="rounded-md bg-mist p-8 text-center text-slate">
              No articles in this category yet.{' '}
              <button type="button" onClick={() => select(null)} className="font-medium text-navy-800 underline underline-offset-2">Show all articles</button>
            </p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((a) => (
                <li key={a.slug}>
                  <article className="group relative flex h-full flex-col gap-3 rounded-md border border-line bg-white p-6 transition-colors hover:border-navy-700/40">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11.5px] uppercase tracking-wider text-gold-700">{a.category}</span>
                      {a.isDemo && <span className="sample-tag">Demonstration content</span>}
                    </div>
                    <h2 className="text-[21px] font-semibold leading-snug">
                      <Link to={`/insights/${a.slug}`} className="after:absolute after:inset-0 group-hover:text-navy-700">
                        {a.title}
                      </Link>
                    </h2>
                    <p className="flex-1 text-[15px] text-slate">{a.excerpt}</p>
                    <p className="flex items-center justify-between text-[13px] text-slate-soft">
                      <time dateTime={a.date}>{formatDate(a.date)}</time>
                      <span className="inline-flex items-center gap-1 font-medium text-navy-800">
                        {a.readMinutes} min read <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
