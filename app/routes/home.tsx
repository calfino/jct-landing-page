import { useState, useEffect, useRef } from "react";
import type { Route } from "./+types/home";
import styles from "./home.module.css";
import {
  Linkedin,
  Github,
  Youtube,
  Mail,
  ChevronLeft,
  ChevronRight,
  Award,
  ArrowUpRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { projects as portfolio } from "../data/projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Johannes Calvin — Software Engineer" },
    {
      name: "description",
      content:
        "Software Engineer with 6+ years across frontend development, network infrastructure, and cloud. Co-founder of Jalur5.",
    },
  ];
}

const experiences = [
  {
    period: "Feb 2025 – Present",
    role: "Software Engineer (Frontend)",
    company: "PT Bank Central Asia Tbk (BCA) – Banking",
    description: (
      <>
        Developing{" "}
        <a
          href="https://ocean.bca.co.id"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.inlineLink}
        >
          Ocean by BCA
        </a>
        .
      </>
    ),
  },
  {
    period: "Oct 2018 – March 2026",
    role: "Co-Founder",
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
    company: "Nodeflux Teknologi Indonesia",
    description:
      "Executed QA processes for AI-driven video analytics; ensured data integrity across IoT pipelines and web applications.",
  },
  {
    period: "Jun 2019 – Aug 2019",
    role: "Software Engineer Intern",
    company: "ExxonMobil – Oil & Gas",
    description:
      "Built full-stack web app using AngularJS & SharePoint API; liaised with procurement team to build procurement internal web app.",
  },
];

const education = [
  {
    degree: "IGCSE, A-Level",
    institution: "Penabur International School",
    highlight: "International school with Cambridge curriculum",
  },
  {
    degree: "Bachelor Degree — Computer Engineering",
    institution: "University of Indonesia",
    highlight:
      "Thesis: Design and Evaluation of Cloud Architecture Data Warehouse for Telehealth based on IoT",
  },
  {
    degree: "Master Degree — Computer Engineering",
    institution: "University of Indonesia",
    highlight:
      "Thesis: Processing Real-Time Data Architecture Optimization for Health Management System based on Cloud",
  },
];

const skills = [
  {
    category: "Frontend Development",
    items: [
      "AngularJS",
      "React",
      "TypeScript",
      "Modern JavaScript",
      "HTML/CSS",
      "Responsive Design",
    ],
  },
  {
    category: "Network & Infrastructure",
    items: [
      "SDN",
      "Routing & Switching",
      "Firewalls",
      "Load Balancers",
      "Proxies",
      "Web Accelerators",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Microservices", "Istio"],
  },
  {
    category: "Data & Backend",
    items: ["Python", "Spark", "Big Data Pipelines", "IoT", "Data Warehousing", "Hadoop"],
  },
];

const publications = [
  {
    title: (
      <a
        href="https://www.researchgate.net/publication/350335262_IoT_cloud_data_warehouse_management_for_telehealth_purpose"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.inlineLink}
      >
        IoT Cloud Data Warehouse Management for Telehealth Purpose
      </a>
    ),
    date: "March 2021",
  },
  {
    title: (
      <a
        href="https://iopscience.iop.org/article/10.1088/1757-899X/1077/1/012021"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.inlineLink}
      >
        Implementation of Socket Priority Module for UAV Network using FlyNetSimulator
      </a>
    ),
    date: "January 2021",
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


const roles = ["Software Engineer", "Ex QA Engineer", "Ex Network Engineer"];

const techStack = [
  { name: "Bootstrap", icon: "https://cdn.simpleicons.org/bootstrap/7952B3" },
  { name: "Material UI", icon: "https://cdn.simpleicons.org/mui/007FFF" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Springboot", icon: "https://cdn.simpleicons.org/springboot/6DB33F" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Angular", icon: "https://cdn.simpleicons.org/angular/DD0031" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "HTML", icon: "https://cdn.simpleicons.org/html5/E34F26" },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg",
  },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
];

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 750}px, ${e.clientY - 750}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ticker = setTimeout(() => {
      const i = loopNum % roles.length;
      const fullText = roles[i];
      const updatedText = isDeleting
        ? fullText.substring(0, roleText.length - 1)
        : fullText.substring(0, roleText.length + 1);

      setRoleText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTypingSpeed(1500);
        setIsDeleting(true);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      } else {
        setTypingSpeed(isDeleting ? 30 : 100);
      }
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [roleText, isDeleting, loopNum, typingSpeed]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      <div ref={cursorRef} className={styles.cursorGlow} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.greeting}>Hello, I'm</p>
          <h1 className={styles.name}>
            <span className={styles.nameLine1}>Johannes</span>
            <span className={styles.nameLine2}>Calvin</span>
          </h1>
          <div className={styles.roleRow}>
            <span className={styles.roleText}>{roleText}</span>
            <span className={styles.cursor}>|</span>
          </div>
          <p className={styles.heroTagline}>
            Building for the web, managing networks, growing communities.
          </p>
          <div className={styles.heroActions}>
            <div className={styles.socialLinks}>
              <a
                href="https://linkedin.com/in/jecete"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className={styles.socialIcon} />
              </a>
              <a
                href="https://github.com/calfino"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className={styles.socialIcon} />
              </a>
            </div>
            <button className={styles.ctaButton} onClick={() => scrollTo("experience")}>
              See my work <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.avatarFrame}>
            <img src="/pp-jct.png" alt="Johannes Calvin" className={styles.avatar} />
          </div>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            Available for opportunities
          </div>
        </div>
      </section>

      {/* About */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <h2 className={styles.aboutHeading}>A bit about me</h2>
            <p className={styles.aboutPara}>
              I'm a software engineer based in Jakarta with 6+ years across frontend
              development, network infrastructure, and cloud engineering. I co-founded{" "}
              <a
                href="https://instagram.com/jalur5"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                Jalur5
              </a>
              , which grew into Indonesia's largest public-transport info hub. I hold a
              Master's in Computer Engineering from University of Indonesia, with research in real-time cloud
              architectures for health systems.
            </p>
          </div>
          <div className={styles.aboutStats}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>6+</span>
              <span className={styles.statLabel}>Years of experience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>Companies</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>2</span>
              <span className={styles.statLabel}>Publications</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={styles.section}>
        <div className={styles.sectionLabel}>
          <span className={styles.sectionNum}>01</span>
          <h2 className={styles.sectionTitle}>Experience</h2>
        </div>
        <div className={styles.expList}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.expRow}>
              <span className={styles.expPeriod}>{exp.period}</span>
              <div className={styles.expBody}>
                <h3 className={styles.expRole}>{exp.role}</h3>
                <p className={styles.expCompany}>{exp.company}</p>
                <p className={styles.expDesc}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <span className={styles.sectionNum}>02</span>
          <h2 className={styles.sectionTitle}>Education</h2>
        </div>
        <div className={styles.eduList}>
          {education.map((edu, index) => (
            <div key={index} className={styles.eduRow}>
              <div className={styles.eduLeft}>
                <h3 className={styles.eduDegree}>{edu.degree}</h3>
                <p className={styles.eduInstitution}>{edu.institution}</p>
              </div>
              <p className={styles.eduHighlight}>{edu.highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={styles.section}>
        <div className={styles.sectionLabel}>
          <span className={styles.sectionNum}>03</span>
          <h2 className={styles.sectionTitle}>Skills & Stack</h2>
        </div>
        <div className={styles.skillTags}>
          {skills.flatMap((s) => s.items).map((skill, i) => (
            <span key={i} className={styles.skillTag}>
              {skill}
            </span>
          ))}
        </div>
        <div className={styles.carouselWrap}>
          <button className={styles.carouselButton} onClick={() => emblaApi?.scrollPrev()}>
            <ChevronLeft size={18} />
          </button>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {techStack.map((tech, idx) => (
                <div className={styles.embla__slide} key={idx}>
                  <div className={styles.techCard}>
                    <img src={tech.icon} alt={tech.name} className={styles.techIcon} />
                    <span className={styles.techName}>{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className={styles.carouselButton} onClick={() => emblaApi?.scrollNext()}>
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={styles.section}>
        <div className={styles.sectionLabel}>
          <span className={styles.sectionNum}>04</span>
          <h2 className={styles.sectionTitle}>Projects</h2>
        </div>

        <div className={styles.featuredProject}>
          <img
            src={portfolio[0].image}
            alt={portfolio[0].title}
            className={styles.featuredImg}
          />
          <div className={styles.featuredContent}>
            <span className={styles.featuredBadge}>Featured</span>
            <h3 className={styles.featuredTitle}>{portfolio[0].title}</h3>
            <p className={styles.featuredDesc}>{portfolio[0].description}</p>
            <a
              href={portfolio[0].links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.featuredLink}
            >
              Visit site <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className={styles.projectsGrid}>
          {portfolio.slice(1).map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.projectImage}
              />
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

      {/* Publications & Certifications */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>
          <span className={styles.sectionNum}>05</span>
          <h2 className={styles.sectionTitle}>Publications & Certifications</h2>
        </div>
        <div className={styles.pubCertGrid}>
          <div>
            <h3 className={styles.subTitle}>Publications</h3>
            <div className={styles.pubList}>
              {publications.map((pub, index) => (
                <div key={index} className={styles.pubItem}>
                  <p className={styles.pubItemTitle}>{pub.title}</p>
                  <span className={styles.pubDate}>{pub.date}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className={styles.subTitle}>Certifications</h3>
            <div className={styles.certList}>
              {certifications.map((cert, index) => (
                <div key={index} className={styles.certItem}>
                  <Award className={styles.certIcon} />
                  <span className={styles.certText}>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contactSection}>
        <p className={styles.contactEyebrow}>Get in touch</p>
        <h2 className={styles.contactHeading}>Let's work together.</h2>
        <a href="mailto:calvintjahaja@gmail.com" className={styles.contactEmail}>
          calvintjahaja@gmail.com
          <ArrowUpRight size={20} />
        </a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>© 2026 Johannes Calvin.</p>
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
