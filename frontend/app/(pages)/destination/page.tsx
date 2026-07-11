'use client';

import styles from './page.module.scss';

import locale from './locale.json';

import { useLanguage, useLocale } from '@/app/hooks/localization/localization';
import { CountryMap } from './components/country-map/country-map';
import { mapCountries } from './components/country-map/country-map.data';

import type { DestinationContent } from './destination.type';

export default function Destination() {
  const { language } = useLanguage();
  const content = useLocale<DestinationContent>(locale, language);

  return (
    <section className={styles.destination}>
      <header className={styles.destination__hero}>
        <p className={styles.destination__eyebrow}>{content.hero.eyebrow}</p>
        <h1 className={styles.destination__title}>{content.hero.title}</h1>
        <p className={styles.destination__lead}>{content.hero.lead}</p>
      </header>

      <section className={styles.destination__section} aria-labelledby="certificate">
        <h2 id="certificate" className={styles.destination__heading}>
          {content.sections.certificate.title}
        </h2>
        <p className={styles.destination__text}>{content.sections.certificate.text}</p>
      </section>

      <section className={styles.destination__section} aria-labelledby="consultation">
        <h2 id="consultation" className={styles.destination__heading}>
          {content.sections.consultation.title}
        </h2>
        <p className={styles.destination__text}>{content.sections.consultation.text}</p>
        <p className={styles.destination__text}>{content.sections.consultation.note}</p>
      </section>

      <section className={styles.destination__section} aria-labelledby="regions">
        <h2 id="regions" className={styles.destination__heading}>
          {content.sections.regions.title}
        </h2>
        <p className={styles.destination__text}>{content.sections.regions.text}</p>
        <ul className={styles.destination__list}>
          {content.sections.regions.list.map((region) => (
            <li key={region} className={styles['destination__list-item']}>
              {region}
            </li>
          ))}
        </ul>
        <CountryMap
          countries={mapCountries}
          label={content.sections.regions.title}
          optionLabel={content.sections.regions.text}
        />
      </section>

      <section className={styles.destination__section} aria-labelledby="about">
        <h2 id="about" className={styles.destination__heading}>
          {content.sections.about.title}
        </h2>
        <p className={styles.destination__text}>{content.sections.about.text}</p>
      </section>

      <section className={styles.destination__section} aria-labelledby="contact">
        <h2 id="contact" className={styles.destination__heading}>
          {content.sections.contact.title}
        </h2>
        <p className={styles.destination__text}>{content.sections.contact.text}</p>
        <address className={styles.destination__contact}>
          <p className={styles.destination__text}>{content.sections.contact.hours}</p>
          <p className={styles.destination__text}>{content.sections.contact.phone}</p>
          <p className={styles.destination__text}>{content.sections.contact.email}</p>
          <p className={styles.destination__text}>{content.sections.contact.address}</p>
        </address>
      </section>
    </section>
  );
}
