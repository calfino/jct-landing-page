import { useState } from "react";
import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { Search, Volume2, Moon, Sun, Rss, Menu, X } from "lucide-react";
import { useColorScheme } from "../hooks/use-color-scheme";

export function Navbar() {
  const { resolvedScheme, setColorScheme } = useColorScheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setColorScheme(resolvedScheme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoName}>Johannes Calvin</span>
        </NavLink>
        
        <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ""}`}>
          <NavLink to="/" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/blog" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
            Blog
          </NavLink>
          <NavLink to="/projects" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
            Projects
          </NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
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
          <button className={styles.mobileMenuButton} aria-label="Toggle Menu" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
