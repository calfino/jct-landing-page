import type { Route } from "./+types/blog";
import { Link } from "react-router";
import styles from "./home.module.css";
import { BookOpen, Calendar, Clock } from "lucide-react";
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

        <div className={styles.projectsGrid}>
          {articles.map((article, index) => (
            <div key={index} className={styles.projectCard} style={{ display: 'flex', flexDirection: 'column' }}>
              <Link to={`/blog/${article.slug}`} style={{ position: 'relative', display: 'block' }}>
                <img src={article.image} alt={article.title} className={styles.projectImage} />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'var(--color-accent-9)',
                  color: 'var(--color-accent-contrast)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-round)',
                  fontSize: 'var(--font-size-0)',
                  fontWeight: 600,
                }}>
                  {article.category}
                </span>
              </Link>
              
              <div className={styles.projectContent} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '16px', color: 'var(--color-neutral-9)', fontSize: 'var(--font-size-0)', marginBottom: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {article.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {article.readTime}
                  </span>
                </div>
                
                <h3 className={styles.projectTitle} style={{ marginBottom: '12px', lineHeight: 1.3 }}>
                  <Link to={`/blog/${article.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className={styles.projectDescription} style={{ marginBottom: '24px', flexGrow: 1 }}>
                  {article.excerpt}
                </p>
                
                <Link
                  to={`/blog/${article.slug}`}
                  className={styles.projectLink}
                  style={{ display: 'inline-flex', alignSelf: 'flex-start', color: 'var(--color-accent-9)', fontWeight: 600, letterSpacing: '0.5px' }}
                >
                  <BookOpen className={styles.projectLinkIcon} />
                  Read Full Article
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
