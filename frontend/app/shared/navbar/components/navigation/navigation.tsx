import locale from '../../locale.json';

import styles from './page.module.scss';

import { useEffect, useState } from 'react';
import type { NavItem } from '../../navbar.type';
import { useLanguage, useLocale } from '@/app/hooks/localization/localization';
import Link from 'next/link';

type NavigationProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
};

export function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const [state, setState] = useState({
    content: locale.da,
    isDropdown: false,
  });
  const { content, isDropdown } = state;

  const { language } = useLanguage();

  useEffect(() => {
    setState((prev) => ({ ...prev, content: useLocale(locale, language) }));
  }, [language]);

  const navigation: NavItem[] = content.nav.map((item: NavItem) => ({
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
  }, [setIsMenuOpen]);

  return (
    <ul className={styles.navigation__list} data-open={isMenuOpen}>
      {navigation.map((item) => (
        <li className={styles.navigation__item} key={`${item.path}-${item.name}`}>
          {item.dropdown ? (
            <div className={styles.navigation__dropdown}>
              <button className={styles.navigation__link} onClick={handleDropdown} type="button">
                {item.name}
                <span className={styles.navigation__arrow}>▾</span>
              </button>
              {isDropdown && (
                <ul className={styles.navigation__droplist}>
                  {content.services.map((service) => (
                    <li key={service.path} className={styles.navigation__drop_item}>
                      <Link
                        onClick={handleLink}
                        className={styles.navigation__link_drop}
                        href={service.path}
                      >
                        {service.name}
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
