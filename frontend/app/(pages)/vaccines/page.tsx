'use client';

import locale from './locale.json';

import styles from './page.module.scss';

import { useState } from 'react';
import { useLanguage, useLocale } from '@/app/hooks/localization/localization';

import type { LocaleContent, LocaleVaccine, VaccineKey } from './vaccines.type';

export default function Vaccines() {
  const [vaccine, setVaccine] = useState<VaccineKey>('welcome');

  const { language } = useLanguage();
  const content = useLocale<LocaleContent>(locale, language);

  const selectedVaccine = content[vaccine] as LocaleVaccine;

  return (
    <div className={styles.vaccines}>
      <aside className={styles.vaccines__sidebar}>
        <p className={styles.vaccines__eyebrow}>Vaccines</p>
        <ul className={styles.vaccines__list}>
          {content?.types.map((item) => (
            <li key={item.path} className={styles.vaccines__list_item}>
              <button
                className={styles.vaccines__button}
                data-active={item.path === vaccine}
                aria-pressed={item.path === vaccine}
                onClick={() => setVaccine(item.path)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className={styles.vaccines__content}>
        {vaccine === 'welcome' ? (
          <section className={styles.vaccines__welcome}>
            <h1 className={styles.vaccines__title}>{content.welcome.title}</h1>
            {content.welcome.description && (
              <p className={styles.vaccines__text}>{content.welcome.description}</p>
            )}
          </section>
        ) : (
          <section className={styles.vaccines__details}>
            <div className={styles.vaccines__information}>
              <div className={styles.vaccines__headline}>
                <p className={styles.vaccines__kicker}>{content.headers.what_is}</p>
                <h1 className={styles.vaccines__heading}>{selectedVaccine.title}</h1>
              </div>
              {selectedVaccine.info.price && (
                <table className={styles.vaccines__table}>
                  <caption className={styles.vaccines__info}>{content.info.title}</caption>
                  <thead>
                    <tr>
                      <th className={styles.vaccines__thead}>{content.info.price}</th>
                      <th className={styles.vaccines__thead}>{content.info.doses}</th>
                      <th className={styles.vaccines__thead}>{content.info.protection}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.vaccines__tbody}>{selectedVaccine.info.price} DKK</td>
                      <td className={styles.vaccines__tbody}>{selectedVaccine.info.doses}</td>
                      <td className={styles.vaccines__tbody}>{selectedVaccine.info.protection}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            {selectedVaccine.info.extra && (
              <p className={styles.vaccines__callout}>{selectedVaccine.info.extra}</p>
            )}

            <div className={styles.vaccines__section}>
              <h2 className={styles.vaccines__subheading}>{content.headers.symptoms}</h2>
              <p className={styles.vaccines__text}>{selectedVaccine.what_is}</p>
            </div>

            <div className={styles.vaccines__section}>
              <h2 className={styles.vaccines__subheading}>{content.headers.vaccination}</h2>
              <p className={styles.vaccines__text}>{selectedVaccine.can_be_vaccinated}</p>
            </div>

            <div className={styles.vaccines__section}>
              <h2 className={styles.vaccines__subheading}>{content.headers.protection}</h2>
              <p className={styles.vaccines__text}>{selectedVaccine.protection}</p>
            </div>

            <div className={styles.vaccines__section}>
              <h2 className={styles.vaccines__subheading}>{content.headers.source}</h2>
              <p className={styles.vaccines__text}>{selectedVaccine.source}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

