'use client';

import styles from './page.module.scss';

import Link from 'next/link';
import Image from 'next/image';
import locale from './locale.json';

import type { NavItem } from './navbar.type';
import { useEffect, useState } from 'react';
import { useLanguage, useLocale } from '@/utils/localization';
import { Contacts } from './components/contacts/contacts';
import { Menu } from './components/menu/menu';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(locale.da);
  const { language } = useLanguage();

  useEffect(() => {
    setContent(useLocale(locale, language));
  });

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
    <>
      <Menu />
      <nav className={styles.navigation}>
        <Contacts />
        <div className={styles.navigation__navbar}>
          <div className={styles.navigation__container}>
            <Link href="/">
              <Image
                className={styles.navigation__logo}
                src="/images/logo.webp"
                width={100}
                height={70}
                alt="logo"
              />
            </Link>
            <ul className={styles.navigation__list}>
              {navigation.map((item, index: number) => (
                <li className={styles.navigation__item} key={index}>
                  {item.dropdown === true ? (
                    <div className={styles.navigation__dropdown}>
                      <button className={styles.navigation__link} onClick={handleDropdown}>
                        {item.name}
                        <span className={styles.navigation__arrow}>▾</span>
                      </button>
                      {isOpen && (
                        <ul className={styles.navigation__droplist}>
                          {content.services.map((item, index) => (
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
    </>
  );
}
