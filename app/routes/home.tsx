import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import styles from "./home.module.css";
import {
  MapPin,
  Linkedin,
  Github,
  Youtube,
  ChevronDown,
  Code2,
  Database,
  Cloud,
  Network,
  Award,
  BookOpen,
  ExternalLink,
  Mail,
} from "lucide-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Johannes Calvin - Software Developer" },
    {
      name: "description",
      content:
        "Software Engineer with 6+ years of experience in frontend development, network infrastructure, and cloud solutions. Co-founder of Jalur5.",
    },
  ];
}

const experiences = [
  {
    period: "Feb 2025 – Present",
    role: "Software Engineer (Frontend)",
    company: "PT Bank Central Asia Tbk (BCA) – Banking",
    description:
      "Developing Ocean platform; delivering UI features with modern frameworks; collaborating with a 10,001+ employee engineering team.",
  },
  {
    period: "Oct 2018 – Present",
    role: "Co-Founder / C-Suite",
    company: "Jalur5 – Broadcast Media & Public Transport Community",
    description:
      "Built Indonesia's largest public-transport info hub; oversee product roadmap, community growth, and media channels (Instagram @jalur5, Twitter @jalur5_, YouTube).",
  },
  {
    period: "Jan 2021 – Jan 2025",
    role: "Network Specialist",
    company: "PT Bank Central Asia Tbk (BCA)",
    description:
      "Managed SDN, routing, switching, load balancers, proxies, next-gen firewalls, and web accelerators for a massive data-center environment.",
  },
  {
    period: "Jul 2021 – Mar 2023",
    role: "Quality Assurance Engineer",
    company: "Nodeflux Teknologi Indonesia – IT Services",
    description: "Executed QA processes for AI-driven video analytics; ensured data integrity across IoT pipelines.",
  },
  {
    period: "Jun 2019 – Aug 2019",
    role: "Software Engineer Intern",
    company: "ExxonMobil – Oil & Gas",
    description: "Built full-stack web app using AngularJS & SharePoint API; liaised with clients on feature specs.",
  },
];

const education = [
  {
    degree: "Magister Teknik (M.T.) – Electrical Engineering",
    institution: "University of Indonesia",
    years: "2019 – 2021",
    highlight:
      "Thesis: Processing Real-Time Data Architecture Optimization for Health Management System based on Cloud",
  },
  {
    degree: "Sarjana Teknik (S.T.) – Computer Engineering",
    institution: "University of Indonesia",
    years: "2015 – 2019",
    highlight: "Thesis: Design and Evaluation of Cloud Architecture Data Warehouse for Telehealth based on IoT",
  },
  {
    degree: "IGCSE, A-Level",
    institution: "Penabur International School, Tanjung Duren",
    years: "2012 – 2015",
    highlight: "International curriculum with focus on STEM subjects",
  },
];

const skills = [
  {
    category: "Frontend Development",
    icon: Code2,
    items: ["AngularJS", "React", "TypeScript", "Modern JavaScript", "HTML/CSS", "Responsive Design"],
  },
  {
    category: "Network & Infrastructure",
    icon: Network,
    items: ["SDN", "Routing & Switching", "Firewalls", "Load Balancers", "Proxies", "Web Accelerators"],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    items: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Microservices", "Istio"],
  },
  {
    category: "Data & Backend",
    icon: Database,
    items: ["Python", "Spark", "Big Data Pipelines", "IoT", "Data Warehousing", "Hadoop"],
  },
];

const publications = [
  {
    title: "IoT Cloud Data Warehouse Management for Telehealth Purpose",
    date: "March 2021",
  },
  {
    title: "Indonesia Symposium on Robotic Systems and Control (ISRSC)",
    date: "July 2018",
  },
  {
    title: "Implementation of Socket Priority Module for UAV Network using FlyNetSimulator",
    date: "2018",
  },
];

const certifications = [
  "Python for Data Science – Cognitive Class",
  "Spark Fundamentals – Cognitive Class",
  "Baseline: Infrastructure – Qwiklabs",
  "Containers, K8s & Istio on IBM Cloud",
  "GCP Essentials – Qwiklabs",
  "Microservices with Istio & IBM Cloud Kubernetes Service",
  "Hadoop Programming – Level 1 – IBM",
  "IBM Cloud Kubernetes Service",
  "Kubernetes in Google Cloud – Qwiklabs",
  "What is Data Science? – IBM",
];

const projects = [
  {
    title: "Jalur5",
    description:
      "Founded and built Indonesia's largest public-transport information community. Developed web portal and social media network providing real-time schedules for Indonesian commuters.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    links: [
      { label: "Instagram", url: "https://instagram.com/jalur5", icon: ExternalLink },
      { label: "YouTube", url: "https://youtube.com/@jalur5", icon: Youtube },
    ],
  },
  {
    title: "Research Publications",
    description:
      "Published multiple research papers on cloud-based healthcare data management, IoT systems, and network optimization. Available on ResearchGate.",
    image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80",
    links: [{ label: "ResearchGate", url: "https://www.researchgate.net/publication/350335262_IoT_cloud_data_warehouse_management_for_telehealth_purpose", icon: BookOpen }],
  },
  {
    title: "Open Source Contributions",
    description:
      "Active contributor to open-source projects with repositories focusing on network simulation, data processing, and web development tools.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
    links: [{ label: "GitHub", url: "https://github.com/calfino", icon: Github }],
  },
];

const roles = [
  "Frontend Developer",
  "Ex QA Engineer",
  "Ex Network Engineer"
];

export default function Home() {
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let ticker = setTimeout(() => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      let updatedText = isDeleting
        ? fullText.substring(0, roleText.length - 1)
        : fullText.substring(0, roleText.length + 1);

      setRoleText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTypingSpeed(1500);
        setIsDeleting(true);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      } else {
        setTypingSpeed(isDeleting ? 30 : 100);
      }
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [roleText, isDeleting, loopNum, typingSpeed]);

  const scrollToContent = () => {
    document.getElementById("summary")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.avatarContainer}>
            <img src="/pp.png" alt="Johannes Calvin" className={styles.avatar} />
          </div>
          <p className={styles.greeting}>Hello, I'm</p>
          <h1 className={styles.name}>Johannes Calvin Tjahaja</h1>
          <h2 className={styles.title}>
            {roleText}
            <span className={styles.cursor}>|</span>
          </h2>

          <div className={styles.location}>
            <MapPin className={styles.locationIcon} />
            <span>Jakarta, Indonesia</span>
          </div>

          <div className={styles.socialLinks}>
            <a
              href="https://linkedin.com/in/jecete"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className={styles.socialIcon} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/calfino"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className={styles.socialIcon} />
              <span>GitHub</span>
            </a>
            <a
              href="https://youtube.com/@jalur5"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className={styles.socialIcon} />
              <span>YouTube</span>
            </a>
          </div>

          <button className={styles.ctaButton} onClick={scrollToContent}>
            <span>Explore My Work</span>
            <ChevronDown className={styles.ctaIcon} />
          </button>
        </div>
      </section>

      {/* Professional Summary */}
      <section id="summary" className={styles.section}>
        <h2 className={styles.sectionTitle}>Professional Summary</h2>
        <div className={styles.summary}>
          Software Engineer with 6+ years of experience building front-end solutions for PT Bank Central Asia (BCA)
          while also managing large-scale network and cloud infrastructure projects (AWS, GCP). Co-founder of Jalur5,
          Indonesia's leading public-transport information community, and author of research papers on IoT-enabled
          healthcare data warehouses. Skilled in full-stack development, SDN, routing, firewalls, big-data pipelines,
          and DevOps tooling.
        </div>
      </section>

      {/* Experience */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.experienceCard}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.experienceRole}>{exp.role}</h3>
                  <span className={styles.experiencePeriod}>{exp.period}</span>
                </div>
                <p className={styles.experienceCompany}>{exp.company}</p>
                <p className={styles.experienceDescription}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.educationGrid}>
          {education.map((edu, index) => (
            <div key={index} className={styles.educationCard}>
              <h3 className={styles.educationDegree}>{edu.degree}</h3>
              <p className={styles.educationInstitution}>{edu.institution}</p>
              <p className={styles.educationYears}>{edu.years}</p>
              <p className={styles.educationHighlight}>{edu.highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Technical Skills</h2>
        <div className={styles.skillsGrid}>
          {skills.map((skillGroup, index) => {
            const IconComponent = skillGroup.icon;
            return (
              <div key={index} className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>
                  <IconComponent className={styles.skillIcon} />
                  {skillGroup.category}
                </h3>
                <ul className={styles.skillList}>
                  {skillGroup.items.map((skill, idx) => (
                    <li key={idx} className={styles.skillTag}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Publications & Certifications */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Publications & Certifications</h2>

        <h3
          style={{
            fontSize: "var(--font-size-3)",
            color: "var(--color-neutral-12)",
            marginBottom: "var(--space-4)",
            fontWeight: 600,
          }}
        >
          Publications
        </h3>
        <div className={styles.publicationsList}>
          {publications.map((pub, index) => (
            <div key={index} className={styles.publicationItem}>
              <h4 className={styles.publicationTitle}>{pub.title}</h4>
              <p className={styles.publicationDate}>{pub.date}</p>
            </div>
          ))}
        </div>

        <h3
          style={{
            fontSize: "var(--font-size-3)",
            color: "var(--color-neutral-12)",
            marginTop: "var(--space-7)",
            marginBottom: "var(--space-4)",
            fontWeight: 600,
          }}
        >
          Certifications
        </h3>
        <div className={styles.certificationGrid}>
          {certifications.map((cert, index) => (
            <div key={index} className={styles.certificationItem}>
              <Award className={styles.certificationIcon} />
              <p className={styles.certificationText}>{cert}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Projects & Community</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
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

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>© 2025 Johannes Calvin. Software Developer & Ex Network Specialist.</p>
          <div className={styles.footerLinks}>
            <a href="mailto:calvintjahaja@gmail.com" className={styles.footerLink}>
              <Mail className={styles.footerLinkIcon} />
            </a>
            <a
              href="https://linkedin.com/in/jecete"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className={styles.footerLinkIcon} />
            </a>
            <a
              href="https://github.com/calfino"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className={styles.footerLinkIcon} />
            </a>
            <a
              href="https://youtube.com/@jalur5"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className={styles.footerLinkIcon} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
