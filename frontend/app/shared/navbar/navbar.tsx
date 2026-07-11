'use client';

import styles from './page.module.scss';

import Link from 'next/link';

import { useState } from 'react';

import { Contacts } from './components/contacts/contacts';
import { Menu } from './components/menu/menu';
import { Navigation } from './components/navigation/navigation';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navigation}>
      <Contacts />
      <div className={styles.navigation__navbar}>
        <Link href="/" className={styles.navigation__brand} aria-label="Vaccin.dk home">
          <span className={styles.navigation__brand_mark} aria-hidden="true">
            V
          </span>
          <span className={styles.navigation__brand_name}>Vaccin.dk</span>
        </Link>
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Link href="/contact" className={styles.navigation__cta}>
          Book consultation
        </Link>
        <Menu isMenuOpen={isMenuOpen} handleMenu={handleMenu} />
      </div>
    </nav>
  );
}
