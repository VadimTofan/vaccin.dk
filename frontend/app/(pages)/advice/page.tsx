'use client';

import styles from './page.module.scss';

import locale from './locale.json';

import { useLanguage, useLocale } from '@/app/hooks/localization/localization';

import type { AdviceContent } from './advice.type';

export default function Advice() {
  const { language } = useLanguage();
  const content = useLocale<AdviceContent>(locale, language);

  return (
    <main className={styles.advice}>
      <header className={styles.advice__hero}>
        <p className={styles.advice__eyebrow}>{content.hero.eyebrow}</p>
        <h1 className={styles.advice__title}>{content.hero.title}</h1>
        <p className={styles.advice__lead}>{content.hero.lead}</p>
      </header>

      <section className={styles.advice__section} aria-labelledby="before-travel">
        <h2 id="before-travel" className={styles.advice__heading}>
          {content.sections.before.title}
        </h2>
        <p className={styles.advice__text}>{content.sections.before.text}</p>
        <ul className={styles.advice__list}>
          {content.sections.before.list.map((item) => (
            <li key={item} className={styles['advice__list-item']}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.advice__section} aria-labelledby="vaccines">
        <h2 id="vaccines" className={styles.advice__heading}>
          {content.sections.vaccines.title}
        </h2>
        <p className={styles.advice__text}>{content.sections.vaccines.text}</p>
      </section>

      <section className={styles.advice__section} aria-labelledby="health">
        <h2 id="health" className={styles.advice__heading}>
          {content.sections.health.title}
        </h2>
        <p className={styles.advice__text}>{content.sections.health.text}</p>
        <ul className={styles.advice__list}>
          {content.sections.health.list.map((item) => (
            <li key={item} className={styles['advice__list-item']}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.advice__section} aria-labelledby="after">
        <h2 id="after" className={styles.advice__heading}>
          {content.sections.after.title}
        </h2>
        <p className={styles.advice__text}>{content.sections.after.text}</p>
      </section>

      <section className={styles.advice__section} aria-labelledby="contact">
        <h2 id="contact" className={styles.advice__heading}>
          {content.sections.contact.title}
        </h2>
        <p className={styles.advice__text}>{content.sections.contact.text}</p>
        <address className={styles.advice__contact}>
          <p className={styles.advice__text}>{content.sections.contact.address}</p>
          <p className={styles.advice__text}>{content.sections.contact.hours}</p>
          <p className={styles.advice__text}>{content.sections.contact.phone}</p>
          <p className={styles.advice__text}>{content.sections.contact.email}</p>
        </address>
      </section>
    </main>
  );
}
