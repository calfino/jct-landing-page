import type { Route } from "./+types/blog";
import { Link } from "react-router";
import styles from "./home.module.css";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { articles } from "../data/articles";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Blog & Articles - Johannes Calvin" },
    {
      name: "description",
      content: "Read my latest articles, tutorials, and thoughts on software engineering.",
    },
  ];
}

export default function Blog() {
  return (
    <div className={styles.page}>
      <section className={styles.section} style={{ paddingTop: 'var(--space-8)' }}>

        <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
          <h1 className={styles.sectionTitle} style={{ fontSize: 'var(--font-size-6)', marginBottom: 'var(--space-3)' }}>
            Blog & Articles
          </h1>
          <p style={{ color: "var(--color-neutral-10)", fontSize: "var(--font-size-2)", maxWidth: "600px", margin: "0 auto" }}>
            Sharing my knowledge on web development, network architecture, and cloud technologies.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {articles.map((article, index) => (
            <Link
              key={index}
              to={`/blog/${article.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 0',
                borderBottom: '1px solid var(--color-neutral-4)',
                gap: '24px',
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      background: 'var(--color-accent-3)',
                      color: 'var(--color-accent-11)',
                      padding: '2px 10px',
                      borderRadius: 'var(--radius-round)',
                      fontSize: 'var(--font-size-0)',
                      fontWeight: 600,
                    }}>
                      {article.category}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: 'var(--font-size-3)', fontWeight: 600, lineHeight: 1.3 }}>
                    {article.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--color-neutral-9)', fontSize: 'var(--font-size-0)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} /> {article.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {article.readTime}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={20} style={{ flexShrink: 0, color: 'var(--color-neutral-9)' }} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
