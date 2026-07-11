import styles from './page.module.scss';

import Link from 'next/link';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/app/hooks/localization/localization';

import type { Language } from '@/app/hooks/localization/localization.type';

const languageNames: Record<Language, string> = {
  da: 'Danish',
  el: 'Greek',
  en: 'English',
  ru: 'Russian',
  sv: 'Swedish',
};

export function Contacts() {
  const languageRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ isModalOpen: false, isDropdown: false });
  const { language, setLanguage } = useLanguage();

  const { isModalOpen, isDropdown } = state;

  const address: string[] = ['Amager', 'Landevej', '31,', '2770'];

  const languages: Language[] = ['da', 'en', 'sv', 'ru', 'el'];
  const inactiveLanguages = languages.filter((lang) => lang !== language);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (
      storedLanguage &&
      ['en', 'da', 'sv', 'ru'].includes(storedLanguage) &&
      language !== storedLanguage
    ) {
      setLanguage(storedLanguage as Language);
    }
  }, [language, setLanguage]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!languageRef.current?.contains(event.target as Node)) {
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

  const handleClick = () => {
    setState((prev) => ({ ...prev, isModalOpen: !prev.isModalOpen }));
  };

  const handleLanguage = (nextLanguage: Language) => {
    localStorage.setItem('language', nextLanguage);
    setLanguage(nextLanguage);
    setState((prev) => ({ ...prev, isDropdown: false }));
  };

  const handleDropdown = () => {
    setState((prev) => ({ ...prev, isDropdown: !prev.isDropdown }));
  };

  return (
    <div className={styles.contacts}>
      {isModalOpen && (
        <div className={styles.contacts__modal} onClick={handleClick}>
          <form className={styles.contacts__form} onClick={(event) => event.stopPropagation()}>
            <p className={styles.contacts__form_text}>TBD</p>
          </form>
        </div>
      )}
      <div className={styles.contacts__bar}>
        <Link
          className={`${styles.contacts__item} ${styles.contacts__mobile}`}
          href={`https://www.google.com/maps/place/${address.join('+')}+Kastrup/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className={styles.contacts__svg}
            src="/images/map-pin.svg"
            width={16}
            height={16}
            alt=""
          />
          {address.join(' ')} Kastrup
        </Link>

        <span className={`${styles.contacts__item} ${styles.contacts__mobile}`}>
          <Image
            className={styles.contacts__svg}
            src="/images/clock.svg"
            width={16}
            height={16}
            alt=""
          />
          08:00 - 16:00
        </span>

        <Link
          className={`${styles.contacts__item} ${styles.contacts__mobile}`}
          href="mailto:klinik@rcscanning.com"
          onClick={handleClick}
        >
          <Image
            className={styles.contacts__svg}
            src="/images/mail.svg"
            width={16}
            height={16}
            alt=""
          />
          klinik@rcscanning.com
        </Link>
        <Link className={styles.contacts__item} href="tel:+4554558965">
          <Image
            className={styles.contacts__svg}
            src="/images/phone.svg"
            width={16}
            height={16}
            alt=""
          />
          (+45) 54 55 89 65
        </Link>
        {language && (
          <div
            className={`${styles.contacts__item} ${styles.contacts__language}`}
            ref={languageRef}
          >
            <button
              aria-controls="language-menu"
              className={styles.contacts__button}
              onClick={handleDropdown}
              type="button"
              aria-expanded={isDropdown}
              aria-label={`Current language: ${languageNames[language]}`}
            >
              <Image src={`/images/${language}.svg`} width={20} height={20} alt="" />
              <span className={styles.contacts__arrow}>▾</span>
            </button>
            {isDropdown === true && (
              <div className={styles.contacts__choice} id="language-menu">
                {inactiveLanguages.map((item) => (
                  <button
                    aria-label={`Switch to ${languageNames[item]}`}
                    className={styles.contacts__choice_button}
                    key={item}
                    onClick={() => {
                      handleLanguage(item);
                    }}
                    type="button"
                  >
                    <Image src={`/images/${item}.svg`} width={20} height={20} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
