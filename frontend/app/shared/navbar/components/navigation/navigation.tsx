import locale from '../../locale.json';

import styles from './page.module.scss';

import { useEffect, useState } from 'react';
import { NavItem } from '../../navbar.type';
import { useLanguage, useLocale } from '@/app/hooks/localization/localization';
import Link from 'next/link';

export function Navigation({ isMenuOpen, setIsMenuOpen }: any) {
  const [state, setState] = useState({
    content: locale.da,
    isDropdown: false,
  });
  const { content, isDropdown } = state;

  const { language } = useLanguage();

  useEffect(() => {
    setState((prev) => ({ ...prev, content: useLocale(locale, language) }));
  }, [language]);

  const navigation: NavItem[] = content.nav.map((item: NavItem, index: number) => ({
    id: index,
    name: item.name,
    path: item.path,
    dropdown: item.dropdown,
  }));

  const handleDropdown = () => {
    setState((prev) => ({ ...prev, isDropdown: !prev.isDropdown }));
  };

  const handleLink = () => {
    setState((prev) => ({ ...prev, isDropdown: false }));
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(false);
      setState((prev) => ({ ...prev, isDropdown: false }));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <ul className={isMenuOpen ? styles['navigation__list--open'] : styles.navigation__list}>
      {navigation.map((item, index: number) => (
        <li className={styles.navigation__item} key={index}>
          {item.dropdown ? (
            <div className={styles.navigation__dropdown}>
              <button className={styles.navigation__link} onClick={handleDropdown}>
                {item.name}
                <span className={styles.navigation__arrow}>▾</span>
              </button>
              {isDropdown && (
                <ul className={styles.navigation__droplist}>
                  {content.services.map((item, index) => (
                    <li key={index}>
                      <Link
                        onClick={handleLink}
                        className={`${styles.navigation__link} ${styles.navigation__linkdrop}`}
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
            <Link onClick={handleLink} className={styles.navigation__link} href={item.path}>
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
