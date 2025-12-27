'use client';

import styles from './page.module.scss';

import Link from 'next/link';
import Image from 'next/image';
import locale from './locale.json';

import { useEffect, useState } from 'react';
import { getLocale, setLanguage } from '@/utils/localization';

import type { NavItem } from './navbar.type';
import { Contacts } from './components/contacts';
import { Language } from '@/utils/localization.type';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('da');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (
      storedLanguage &&
      ['en', 'da', 'sv', 'ru'].includes(storedLanguage) &&
      lang !== storedLanguage
    ) {
      setLanguage(storedLanguage as Language);
      setLang(storedLanguage as Language);
    }
  }, [lang]);

  const content = getLocale(locale);
  const navigation: NavItem[] = content.nav.map((item: NavItem, index: number) => ({
    id: index,
    name: item.name,
    path: item.path,
    dropdown: item.dropdown,
  }));

  const handleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <nav className={styles.navigation}>
      <Contacts />
      <div className={styles.navigation__navbar}>
        <div className={styles.navigation__container}>
          <Image
            className={styles.navigation__logo}
            src="/images/logo.webp"
            width={100}
            height={70}
            alt="logo"
          />
          <ul className={styles.navigation__list}>
            {navigation.map((item, index: number) => (
              <li className={styles.navigation__item} key={index}>
                {item.dropdown === true ? (
                  <div className={styles.navigation__dropdown}>
                    <button className={styles.navigation__link} onClick={handleDropdown}>
                      {item.name}▾
                    </button>
                    {isOpen && (
                      <ul className={styles.navigation__droplist}>
                        {content.services.map((item: NavItem, index: number) => (
                          <li key={index}>
                            <Link
                              onClick={() => {
                                setIsOpen(false);
                              }}
                              className={styles.navigation__link}
                              href={item.path}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={styles.navigation__link}
                    href={item.path}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
