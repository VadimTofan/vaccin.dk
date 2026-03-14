'use client';

import locale from './locale.json';

import styles from './page.module.scss';

import { useState } from 'react';
import { useLanguage, useLocale } from '@/app/hooks/localization/localization';

const localeData = locale as const;

type LocaleContent = (typeof localeData)['da'];
type VaccineKey = Extract<LocaleContent['types'][number]['path'], keyof LocaleContent> | 'welcome';

export default function Vaccines() {
  const [vaccine, setVaccine] = useState<VaccineKey>('welcome');

  const { language } = useLanguage();
  const content = useLocale<LocaleContent>(localeData, language);

  const selectedVaccine = content[vaccine];

  return (
    <div className={styles.vaccines}>
      <ul className={styles.vaccines__list}>
        {content?.types.map((item) => (
          <li key={item.path}>
            <button
              className={styles.vaccines__button}
              onClick={() => setVaccine(item.path)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      {vaccine === 'welcome' ? (
        <h1>{content.welcome.title}</h1>
      ) : (
        <section>
          <div className={styles.vaccines__information}>
            <h1 className={styles.vaccines__heading}>{selectedVaccine.title}</h1>
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
          {selectedVaccine.info.extra && <p>{selectedVaccine.info.extra}</p>}
          <h2>{content.headers.symptoms}</h2>
          <p>{selectedVaccine.what_is}</p>
          <h2>{content.headers.vaccination}</h2>
          <p>{selectedVaccine.can_be_vaccinated}</p>
          <h2>{content.headers.protection}</h2>
          <p>{selectedVaccine.protection}</p>
          <h2>{content.headers.source}</h2>
          <p>{selectedVaccine.source}</p>
        </section>
      )}
    </div>
  );
}
