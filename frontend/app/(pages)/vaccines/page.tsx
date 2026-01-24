'use client';

import locale from './locale.json';

import styles from './page.module.scss';

import { useEffect, useState } from 'react';
import { useLanguage, useLocale } from '@/app/hooks/localization/localization';
import { Vaccine } from './vaccine.types';

export default function Vaccines() {
  const [state, setState] = useState({
    content: locale.da,
    vaccine: 'welcome',
  });
  const { content, vaccine } = state;

  const { language } = useLanguage();

  useEffect(() => {
    setState((prev) => ({ ...prev, content: useLocale(locale, language) }));
  }, [language]);

  const selectedVaccine: Vaccine = (content as Record<string, any>)[vaccine];
  console.log(selectedVaccine);
  return (
    <div className={styles.vaccines}>
      <ul>
        {content?.types.map((item, index) => (
          <li key={item.path}>
            <button onClick={() => setState((prev) => ({ ...prev, vaccine: item.path }))}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      {vaccine === 'welcome' ? (
        <h1>Welcome to our Vaccination Page</h1>
      ) : (
        <div>
          <h1>{selectedVaccine.title}</h1>
          {selectedVaccine.info.price && (
            <table>
              <caption>{content.info.title}</caption>
              <thead>
                <tr>
                  <th>{content.info.price}</th>
                  <th>{content.info.doses}</th>
                  <th>{content.info.protection}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedVaccine.info.price} DKK</td>
                  <td>{selectedVaccine.info.doses}</td>
                  <td>{selectedVaccine.info.protection}</td>
                </tr>
              </tbody>
            </table>
          )}
          {selectedVaccine.info.extra && <p>{selectedVaccine.info.extra}</p>}
          <h2>{content.headers.symptoms}</h2>
          <p>{selectedVaccine.what_is}</p>
          <h2>{content.headers.vaccination}</h2>
          <p>{selectedVaccine.can_be_vaccinated}</p>
          <h2>{content.headers.protection}</h2>
          <p>{selectedVaccine.protection}</p>
          <h2>{content.headers.source}</h2>
          <p>{selectedVaccine.source}</p>
        </div>
      )}
    </div>
  );
}
