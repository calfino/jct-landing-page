import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { Search, Volume2, Moon, Sun, Rss } from "lucide-react";
import { useColorScheme } from "../hooks/use-color-scheme";

export function Navbar() {
  const { resolvedScheme, setColorScheme } = useColorScheme();

  const toggleTheme = () => {
    setColorScheme(resolvedScheme === "dark" ? "light" : "dark");
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoName}>Johannes Calvin</span>
        </NavLink>
        
        <div className={styles.navLinks}>
          <NavLink to="/" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>
            Home
          </NavLink>
          <NavLink to="/blog" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>
            Blog
          </NavLink>
          <NavLink to="/projects" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>
            Projects
          </NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>
            About
          </NavLink>
        </div>

        <div className={styles.navActions}>
          <button className={styles.actionButton} aria-label="Search">
            <Search size={20} />
          </button>
          <button className={styles.actionButton} aria-label="Toggle Sound">
            <Volume2 size={20} />
          </button>
          <button className={styles.actionButton} aria-label="Toggle Theme" onClick={toggleTheme}>
            {resolvedScheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={styles.actionButton} aria-label="RSS Feed">
            <Rss size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
