'use client';

import styles from './page.module.scss';

import locale from './locale.json';

import { useLanguage, useLocale } from '@/app/hooks/localization/localization';

import type { AboutContent } from './about-us.type';

export default function About() {
  const { language } = useLanguage();
  const content = useLocale<AboutContent>(locale, language);

  return (
    <main className={styles.about}>
      <header className={styles.about__hero}>
        <p className={styles.about__eyebrow}>{content.hero.eyebrow}</p>
        <h1 className={styles.about__title}>{content.hero.title}</h1>
        <p className={styles.about__lead}>{content.hero.lead}</p>
      </header>

      <section className={styles.about__section} aria-labelledby="mission">
        <h2 id="mission" className={styles.about__heading}>
          {content.sections.mission.title}
        </h2>
        <p className={styles.about__text}>{content.sections.mission.text}</p>
      </section>

      <section className={styles.about__section} aria-labelledby="team">
        <h2 id="team" className={styles.about__heading}>
          {content.sections.team.title}
        </h2>
        <p className={styles.about__text}>{content.sections.team.text}</p>
      </section>

      <section className={styles.about__section} aria-labelledby="facility">
        <h2 id="facility" className={styles.about__heading}>
          {content.sections.facility.title}
        </h2>
        <p className={styles.about__text}>{content.sections.facility.text}</p>
      </section>

      <section className={styles.about__section} aria-labelledby="care">
        <h2 id="care" className={styles.about__heading}>
          {content.sections.care.title}
        </h2>
        <p className={styles.about__text}>{content.sections.care.text}</p>
      </section>

      <section className={styles.about__section} aria-labelledby="contact">
        <h2 id="contact" className={styles.about__heading}>
          {content.sections.contact.title}
        </h2>
        <p className={styles.about__text}>{content.sections.contact.text}</p>
        <address className={styles.about__contact}>
          <p className={styles.about__text}>{content.sections.contact.address}</p>
          <p className={styles.about__text}>{content.sections.contact.hours}</p>
          <p className={styles.about__text}>{content.sections.contact.phone}</p>
          <p className={styles.about__text}>{content.sections.contact.email}</p>
        </address>
      </section>
    </main>
  );
}
