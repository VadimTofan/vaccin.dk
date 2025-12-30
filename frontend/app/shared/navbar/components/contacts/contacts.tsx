import styles from './page.module.scss';

import Link from 'next/link';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/app/hooks/localization/localization';

import type { Language } from '@/app/hooks/localization/localization.type';

export function Contacts() {
  const [state, setState] = useState({ isModalOpen: false, isDropdown: false });
  const { language, setLanguage } = useLanguage();

  const { isModalOpen, isDropdown } = state;

  const address: string[] = ['Amager', 'Landevej', '31,', '2770'];

  const languages: Language[] = ['da', 'en', 'sv', 'ru', 'gr'];
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
  }, [languages]);

  const handleClick = () => {
    setState((prev) => ({ ...prev, isModalOpen: !prev.isModalOpen }));
  };

  const handleLanguage = (language: Language) => {
    localStorage.setItem('language', language);
    console.log(`this is working`);
    setLanguage(language);
  };

  const handleDropdown = () => {
    setState((prev) => ({ ...prev, isDropdown: !prev.isDropdown }));
  };

  return (
    <div className={styles.contacts}>
      {isModalOpen && (
        <div className={styles.contacts__modal} onClick={handleClick}>
          <form className={styles.contacts__form} onClick={(event) => event.stopPropagation()}>
            <p>TBD</p>
          </form>
        </div>
      )}
      <div className={`${styles.contacts__location} ${styles.contacts__mobile}`}>
        <Link
          className={styles.contacts__link}
          href={`https://www.google.com/maps/place/${address.join('+')}+Kastrup/`}
          target="_blank"
        >
          <Image
            className={styles.contacts__svg}
            src="/images/map-pin.svg"
            width={20}
            height={20}
            alt="location pin"
          />
          {address.join(' ')}
        </Link>
      </div>
      <div className={`${styles.contacts__link} ${styles.contacts__mobile}`}>
        <Image
          className={styles.contacts__svg}
          src="/images/clock.svg"
          width={20}
          height={20}
          alt="working hours clock"
        />
        <p className={styles.contacts__hours}>08:00 - 16:00</p>
      </div>
      <div className={styles.contacts__communication}>
        <Link
          className={`${styles.contacts__link} ${styles.contacts__mobile}`}
          href="mailto:klinik@rcscanning.com"
          onClick={handleClick}
        >
          <Image
            className={styles.contacts__svg}
            src="/images/mail.svg"
            width={20}
            height={20}
            alt="send e-mail button"
          />
          klinik@rcscanning.com
        </Link>
        <Link className={styles.contacts__link} href="tel:+454558965">
          <Image
            className={styles.contacts__svg}
            src="/images/phone.svg"
            width={20}
            height={20}
            alt="call us button"
          />
          (+45) 54 55 89 65
        </Link>
      </div>

      {language && (
        <button className={styles.contacts__button} onClick={handleDropdown}>
          <Image src={`/images/${language}.svg`} width={20} height={20} alt={`Flag ${language}`} />
          <span className={styles.contacts__arrow}>▾</span>
          {isDropdown === true && (
            <div className={styles.contacts__choice}>
              {inactiveLanguages.map((item: Language, index: number) => (
                <Image
                  key={index}
                  src={`/images/${item}.svg`}
                  width={20}
                  height={20}
                  alt={`Flag ${item}`}
                  onClick={() => {
                    handleLanguage(item);
                  }}
                />
              ))}
            </div>
          )}
        </button>
      )}
    </div>
  );
}
