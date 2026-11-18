import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import { CtaBand } from '../components/sections/HomeSections';
import { getArticle, sortedArticles, type ArticleBlock } from '../content/articles';
import { siteConfig } from '../config/siteConfig';
import { formatDate } from '../utils/format';
import NotFound from './NotFound';

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="pt-4 text-[26px] font-semibold">{block.text}</h2>;
    case 'ul':
      return (
        <ul className="flex list-disc flex-col gap-2 pl-6 text-[17px] text-slate marker:text-gold-700">
          {block.items.map((i) => <li key={i}>{i}</li>)}
        </ul>
      );
    case 'note':
      return (
        <p className="flex gap-3 rounded-md border-l-2 border-gold-500 bg-mist p-4 text-[15px] text-ink">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
          {block.text}
        </p>
      );
    default:
      return <p className="text-[17px] leading-[1.75] text-slate">{block.text}</p>;
  }
}

/** Reusable layout for every article in src/content/articles.ts. */
export default function Article() {
  const { slug = '' } = useParams();
  const article = getArticle(slug);
  if (!article) return <NotFound />;

  const related = sortedArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          datePublished: article.date,
          articleSection: article.category,
          author: { '@type': 'Person', name: siteConfig.founder.name },
          publisher: { '@type': 'Organization', name: siteConfig.firm.name },
        }}
      />
      <PageHeader
        eyebrow={article.category}
        title={article.title}
        crumbs={[{ label: 'Insights', to: '/insights' }, { label: article.title }]}
      >
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-navy-100/75">
          <span>{siteConfig.founder.name}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>{article.readMinutes} min read</span>
          {article.isDemo && <span className="rounded-sm border border-dashed border-gold-300/70 px-1.5 font-mono text-[11px] uppercase tracking-wider text-gold-300">Demonstration content</span>}
        </p>
      </PageHeader>
      <article className="container-page py-14">
        <div className="mx-auto flex max-w-prose flex-col gap-5">
          {article.body.map((b, i) => <Block key={i} block={b} />)}
          <p className="mt-6 border-t border-line pt-6 text-[13.5px] text-slate-soft">
            This article is for general information only and is not professional advice for your specific situation. Please{' '}
            <Link to="/contact" className="link">contact us</Link> before acting on it.
          </p>
          <Link to="/insights" className="link inline-flex items-center gap-2 self-start text-[15px]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to all insights
          </Link>
        </div>
      </article>
      {related.length > 0 && (
        <section aria-labelledby="related" className="bg-mist py-14">
          <div className="container-page flex flex-col gap-6">
            <h2 id="related" className="text-[24px] font-semibold">More insights</h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {related.map((a) => (
                <li key={a.slug} className="rounded-md border border-line bg-white p-6">
                  <p className="font-mono text-[11.5px] uppercase tracking-wider text-gold-700">{a.category}</p>
                  <h3 className="mt-2 text-[19px] font-semibold">
                    <Link to={`/insights/${a.slug}`} className="link">{a.title}</Link>
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
