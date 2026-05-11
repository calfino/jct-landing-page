import type { Route } from "./+types/projects";
import styles from "./home.module.css";
import { projects as portfolio } from "../data/projects";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Projects - Johannes Calvin" },
    {
      name: "description",
      content: "A collection of my projects and work.",
    },
  ];
}

export default function Projects() {
  return (
    <div className={styles.page}>
      <section className={styles.section} style={{ paddingTop: 'var(--space-8)' }}>
        <h1 className={styles.sectionTitle} style={{ fontSize: 'var(--font-size-6)', marginBottom: 'var(--space-6)' }}>My Projects</h1>
        <div className={styles.projectsGrid}>
          {portfolio.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <img src={project.image} alt={project.title} className={styles.projectImage} />
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectLinks}>
                  {project.links.map((link, idx) => {
                    const LinkIcon = link.icon;
                    return (
                      <a
                        key={idx}
                        href={link.url}
                        className={styles.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkIcon className={styles.projectLinkIcon} />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
