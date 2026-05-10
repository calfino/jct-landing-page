import type { Route } from "./+types/about";
import styles from "./about.module.css";
import { ArrowUpRight } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About — Johannes Calvin" },
    {
      name: "description",
      content:
        "Software engineer based in Jakarta. 6+ years across frontend, network infrastructure, and cloud. Co-founder of Jalur5.",
    },
  ];
}

const details = [
  { label: "Location", value: "Jakarta, Indonesia" },
  { label: "Role", value: "Software Engineer (Frontend) @ BCA" },
  { label: "Education", value: "M.Eng, Computer Engineering — University of Indonesia" },
  { label: "Background", value: "Frontend · Network · Cloud · QA" },
  { label: "Languages", value: "Indonesian (native), English (fluent)" },
  { label: "Email", value: "calvintjahaja@gmail.com" },
];

const interests = [
  "Artificial Intelligence",
  "Software Engineering",
  "Data Science",
  "IoT",
  "Network architecture",
  "Cloud Engineering",
  "Data Engineering",
  "Cloud infrastructure",
  "UI/UX design",
  "Devops",
  "Open-source",
];

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>About me</p>
        <h1 className={styles.heading}>Johannes Calvin<br />Tjahaja</h1>
      </div>

      <div className={styles.body}>
        {/* Intro */}
        <div className={styles.intro}>
          <div className={styles.introText}>
            <p className={styles.introPara}>
              I'm a software engineer based in Jakarta with a background that spans
              frontend development, network infrastructure, and cloud engineering.
              Right now I'm building{" "}
              <a
                href="https://ocean.bca.co.id"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                Ocean by BCA
              </a>{" "}
              — an enterprise web platform for one of Indonesia's largest banks.
            </p>
            <p className={styles.introPara}>
              Before moving to frontend full-time, I spent four years as a Network
              Specialist at BCA managing SDN, firewalls, load balancers, and
              data-center infrastructure. That foundation still shapes how I think
              about software — performance, reliability, and the systems underneath
              the UI matter.
            </p>
            <p className={styles.introPara}>
              In 2018, I co-founded{" "}
              <a
                href="https://instagram.com/jalur5"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                Jalur5
              </a>
              , a public-transport information community that grew into the largest
              of its kind in Indonesia across Instagram, Twitter, and YouTube. It
              started as a side project and became something I'm genuinely proud of.
            </p>
            <p className={styles.introPara}>
              I hold a Master's in Computer Engineering from the University of
              Indonesia, where my research focused on real-time cloud data
              architectures for health management systems.
            </p>
          </div>

          <div className={styles.imageWrap}>
            <img src="/pp-jct.png" alt="Johannes Calvin" className={styles.photo} />
          </div>
        </div>

        {/* Details */}
        <div className={styles.detailsGrid}>
          {details.map((d, i) => (
            <div key={i} className={styles.detailRow}>
              <span className={styles.detailLabel}>{d.label}</span>
              <span className={styles.detailValue}>{d.value}</span>
            </div>
          ))}
        </div>

        {/* Interests */}
        <div className={styles.interests}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionNum}>01</span>
            <h2 className={styles.sectionTitle}>Interests</h2>
          </div>
          <div className={styles.tagCloud}>
            {interests.map((item, i) => (
              <span key={i} className={styles.tag}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaLabel}>Get in touch</p>
          <h2 className={styles.ctaHeading}>Let's work together.</h2>
          <a href="mailto:calvintjahaja@gmail.com" className={styles.ctaEmail}>
            calvintjahaja@gmail.com
            <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
