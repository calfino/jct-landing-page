import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { Search, Volume2, Moon, Rss } from "lucide-react";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoName}>Johannes Calvin</span>
        </NavLink>
        
        <div className={styles.navLinks}>
          <NavLink to="/" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>
            Articles
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
          <button className={styles.actionButton} aria-label="Toggle Theme">
            <Moon size={20} />
          </button>
          <button className={styles.actionButton} aria-label="RSS Feed">
            <Rss size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
