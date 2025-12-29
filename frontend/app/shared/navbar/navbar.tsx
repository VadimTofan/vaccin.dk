'use client';

import styles from './page.module.scss';

import Link from 'next/link';
import Image from 'next/image';

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
    <>
      <nav className={styles.navigation}>
        <Contacts />
        <div className={styles.navigation__navbar}>
          <Link href="/">
            <Image
              className={styles.navigation__logo}
              src="/images/logo.webp"
              width={50}
              height={40}
              alt="logo"
            />
          </Link>
          <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Menu isMenuOpen={isMenuOpen} handleMenu={handleMenu} />
        </div>
      </nav>
    </>
  );
}
