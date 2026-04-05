import type { Route } from "./+types/about";
import styles from "./home.module.css";
import { Navbar } from "../components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Johannes Calvin" },
    {
      name: "description",
      content: "Learn more about Johannes Calvin.",
    },
  ];
}

export default function About() {
  return (
    <div className={styles.page}>
      <section className={styles.aboutSection} style={{ marginTop: 'var(--space-8)' }}>
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
    </div>
  );
}
