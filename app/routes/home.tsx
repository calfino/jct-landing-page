import { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Johannes Calvin - Software Engineer" },
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
    description: (
      <>
        Developing <a href="https://ocean.bca.co.id" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Ocean by BCA</a>.
      </>
    ),
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
    company: "Nodeflux Teknologi Indonesia",
    description: "Executed QA processes for AI-driven video analytics; ensured data integrity across IoT pipelines and web applications.",
  },
  {
    period: "Jun 2019 – Aug 2019",
    role: "Software Engineer Intern",
    company: "ExxonMobil – Oil & Gas",
    description: "Built full-stack web app using AngularJS & SharePoint API; liaised with procurement team to build procurement internal web app.",
  },
];

const education = [
  {
    degree: "IGCSE, A-Level",
    institution: "Penabur International School",
    years: "2012 – 2015",
    highlight: "International school with Cambridge curriculum",
  },
  {
    degree: "Bachelor Degree  Computer Engineering",
    institution: "University of Indonesia",
    years: "2016 – 2019",
    highlight: "Thesis: Design and Evaluation of Cloud Architecture Data Warehouse for Telehealth based on IoT",
  },
  {
    degree: "Master Degree  Computer Engineering",
    institution: "University of Indonesia",
    years: "2019 – 2021",
    highlight:
      "Thesis: Processing Real-Time Data Architecture Optimization for Health Management System based on Cloud",
  }
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

const roles = [
  "Software Engineer",
  "Ex QA Engineer",
  "Ex Network Engineer"
];

const techStack = [
  { name: "Bootstrap", icon: "https://cdn.simpleicons.org/bootstrap/7952B3" },
  { name: "Material UI", icon: "https://cdn.simpleicons.org/mui/007FFF" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Springboot", icon: "https://cdn.simpleicons.org/springboot/6DB33F" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Angular", icon: "https://cdn.simpleicons.org/angular/DD0031" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "HTML", icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg" },
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
      <div ref={cursorRef} className={styles.cursorGlow} />
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.avatarContainer}>
            <img src="/pp-jct.png" alt="Johannes Calvin" className={styles.avatar} />
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

          <button className={styles.ctaButton} onClick={scrollToContent}>
            <span>Explore My Work</span>
            <ChevronDown className={styles.ctaIcon} />
          </button>
        </div>
      </section>

      {/* About Me Section */}
      <section id="summary" className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutTextContainer}>
            <h2 className={styles.aboutTitle}>WHO I AM?</h2>
            <p className={styles.aboutParagraph}>
              My name is Johannes Calvin Tjahaja. I am a professional and enthusiastic programmer in my daily life. I am a quick learner with a self-learning attitude. I love to learn and explore new technologies and am passionate about problem-solving. I love almost all the stacks of web application development and love to make the web more open to the world. My core skill is based on JavaScript and I love to do most of the things using JavaScript. I am available for any kind of job opportunity that suits my skills and interests.
            </p>
          </div>
          <div className={styles.aboutImageContainer}>
            <img src="/pp.png" alt="About Me" className={styles.aboutImage} />
          </div>
          <div className={styles.aboutVerticalText}>
            ABOUT ME
          </div>
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
        <div className={styles.skillsCarouselHeader}>
          <hr className={styles.skillsLine} />
          <h2 className={styles.carouselTitle}>Skills</h2>
          <hr className={styles.skillsLine} />
        </div>
        <div className={styles.carouselContainer}>
          <button className={styles.carouselButton} onClick={() => emblaApi?.scrollPrev()}>
            <ChevronLeft />
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
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* Projects */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Projects</h2>
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

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>© 2026 Johannes Calvin. Software Engineer.</p>
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
