import locale from '../../locale.json';

import styles from './page.module.scss';

import { useEffect, useRef, useState } from 'react';
import type { NavItem } from '../../navbar.type';
import { useLanguage, useLocale } from '@/app/hooks/localization/localization';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
};

export function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setState((prev) => ({ ...prev, isDropdown: false }));
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setState((prev) => ({ ...prev, isDropdown: false }));
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
    <ul className={styles.navigation__list} data-open={isMenuOpen} id="primary-navigation">
      {navigation.map((item) => (
        <li className={styles.navigation__item} key={`${item.path}-${item.name}`}>
          {item.dropdown ? (
            <div className={styles.navigation__dropdown} ref={dropdownRef}>
              <button
                aria-controls="services-menu"
                aria-expanded={isDropdown}
                className={styles.navigation__trigger}
                data-expanded={isDropdown}
                onClick={handleDropdown}
                type="button"
              >
                {item.name}
                <span aria-hidden="true" className={styles.navigation__arrow} />
              </button>
              {isDropdown && (
                <ul className={styles.navigation__droplist} id="services-menu">
                  {content.services.map((service) => (
                    <li key={service.path} className={styles.navigation__drop_item}>
                      <Link
                        aria-current={service.path === pathname ? 'page' : undefined}
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
            <Link
              aria-current={item.path === pathname ? 'page' : undefined}
              onClick={handleLink}
              className={styles.navigation__link}
              href={item.path}
            >
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
