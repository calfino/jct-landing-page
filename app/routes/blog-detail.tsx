import type { Route } from "./+types/blog-detail";
import { Link, redirect } from "react-router";
import styles from "./home.module.css";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { getPostBySlug } from "../lib/sanity";

export async function loader({ params }: Route.LoaderArgs) {
  const article = await getPostBySlug(params.slug);
  if (!article) {
    throw redirect("/blog");
  }
  return { article };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.article) {
    return [{ title: "Article Not Found" }];
  }
  return [
    { title: `${data.article.title} - Johannes Calvin` },
    { name: "description", content: data.article.excerpt },
  ];
}

export default function BlogDetail({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;

  return (
    <div className={styles.page}>
      <div className={styles.section} style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
        
        {/* Back Button */}
        <div style={{ marginBottom: 'var(--space-5)' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-neutral-10)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header style={{ marginBottom: 'var(--space-7)' }}>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--color-neutral-9)', fontSize: 'var(--font-size-1)', marginBottom: 'var(--space-4)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} /> {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} /> {article.readTime}
            </span>
            <span style={{ background: 'var(--color-accent-9)', color: 'var(--color-accent-contrast)', padding: '2px 10px', borderRadius: 'var(--radius-round)', fontWeight: 600 }}>
              {article.category}
            </span>
          </div>

          <h1 style={{ fontSize: 'var(--font-size-6)', color: 'var(--color-neutral-12)', fontWeight: 700, lineHeight: 1.2, marginBottom: 'var(--space-5)' }}>
            {article.title}
          </h1>

          <img 
            src={article.image} 
            alt={article.title} 
            style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', borderRadius: 'var(--radius-3)', marginBottom: 'var(--space-5)' }}
          />

          <p style={{ fontSize: 'var(--font-size-3)', color: 'var(--color-neutral-11)', lineHeight: 1.6, fontStyle: 'italic', borderLeft: '4px solid var(--color-accent-9)', paddingLeft: '16px' }}>
            {article.excerpt}
          </p>
        </header>

        {/* Article Body */}
        <article style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {article.content.trim().split('\n\n').map((block: string, idx: number) => {
            const lines = block.trim().split('\n');
            const isCodeBlock = lines[0] && lines[0].startsWith('```');
            
            if (isCodeBlock) {
              const codeLines = lines.slice(1, lines.length > 1 && lines[lines.length - 1].startsWith('```') ? -1 : undefined);
              return (
                <pre key={idx} style={{ background: 'var(--color-neutral-3)', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: 'var(--font-size-1)', color: 'var(--color-neutral-11)' }}>
                  <code>
                    {codeLines.join('\n')}
                  </code>
                </pre>
              );
            }

            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {lines.map((line: string, lineIdx: number) => {
                  if (line.startsWith('### ')) {
                    return <h3 key={lineIdx} style={{ color: 'var(--color-neutral-12)', fontSize: 'var(--font-size-4)', marginTop: 'var(--space-4)', fontWeight: 600 }}>{line.replace('### ', '')}</h3>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={lineIdx} style={{ color: 'var(--color-neutral-11)', fontSize: 'var(--font-size-2)', lineHeight: 1.8, marginLeft: '24px' }}>{line.replace('- ', '')}</li>;
                  }
                  if (!line.trim()) return null;
                  
                  return (
                    <p key={lineIdx} style={{ color: 'var(--color-neutral-11)', fontSize: 'var(--font-size-2)', lineHeight: 1.8 }}>
                      {line.replace(/\*\*(.*?)\*\*/g, '$1')} 
                    </p>
                  );
                })}
              </div>
            );
          })}
        </article>

      </div>
    </div>
  );
}
