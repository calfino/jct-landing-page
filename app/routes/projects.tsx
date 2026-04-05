import type { Route } from "./+types/projects";
import styles from "./home.module.css";
import { ExternalLink } from "lucide-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Projects - Johannes Calvin" },
    {
      name: "description",
      content: "A collection of my projects and work.",
    },
  ];
}

const portfolio = [
  {
    title: "Ocean by BCA",
    description: "Enterprise web application developed for BCA.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    links: [{ label: "Visit Website", url: "https://ocean.bca.co.id/", icon: ExternalLink }],
  },
  {
    title: "SmartSales",
    description: "Sales tracking and management platform.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    links: [{ label: "Visit Website", url: "https://smartsales.id/", icon: ExternalLink }],
  },
  {
    title: "TravelingYuk",
    description: "Travel planning and booking web application.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    links: [{ label: "Visit Website", url: "https://travelingyuk.vercel.app/", icon: ExternalLink }],
  },
  {
    title: "Johannes Calvin",
    description: "Personal landing page and resume portfolio.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    links: [{ label: "Visit Website", url: "https://johannes-calvin.vercel.app/", icon: ExternalLink }],
  },
];

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
