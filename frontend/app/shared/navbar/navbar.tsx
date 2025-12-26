'use client';

import styles from './page.module.scss';

import Link from 'next/link';
import Image from 'next/image';
import locale from './locale.json';

import { useEffect, useState } from 'react';
import { getLocale, setLanguage } from '@/utils/localization';

import type { NavItem } from './navbar.type';

export function Navbar() {
  const [state, setState] = useState('da');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      setState(storedLanguage);
    }
  }, [state]);

  const content = getLocale(locale);

  const navigation: NavItem[] = content.nav.map((item: NavItem, index: number) => ({
    id: index,
    name: item.name,
    path: item.path,
  }));

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__info}>
        <div className={styles.navigation__location}>{content.location}</div>
        <div className={styles.navigation__hours}></div>
      </div>
      <div className={styles.navigation__contacts}></div>
      <div>
        <Image
          className={styles.navigation__logo}
          src="/images/logo.webp"
          width={150}
          height={100}
          alt="logo"
        />
        <ul className={styles.navigation__list}>
          {navigation.map((item, index: number) => (
            <li className={styles.navigation__item} key={index}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
