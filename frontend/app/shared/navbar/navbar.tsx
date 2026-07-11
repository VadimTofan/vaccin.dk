'use client';

import styles from './page.module.scss';

import Link from 'next/link';

import { useState } from 'react';
import { useLanguage, useLocale } from '@/app/hooks/localization/localization';

import locale from './locale.json';
import { Contacts } from './components/contacts/contacts';
import { Menu } from './components/menu/menu';
import { Navigation } from './components/navigation/navigation';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const content = useLocale(locale, language);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navigation}>
      <Contacts />
      <div className={styles.navigation__navbar}>
        <Link href="/" className={styles.navigation__brand} aria-label={content.shell.brandHome}>
          <span className={styles.navigation__brand_mark} aria-hidden="true">
            V
          </span>
          <span className={styles.navigation__brand_name}>Vaccin.dk</span>
        </Link>
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Link href="/contact" className={styles.navigation__cta}>
          {content.shell.bookConsultation}
        </Link>
        <Menu isMenuOpen={isMenuOpen} handleMenu={handleMenu} />
      </div>
    </nav>
  );
}
