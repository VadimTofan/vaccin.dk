'use client';

import styles from './page.module.scss';

import locale from './locale.json';

import { useLanguage, useLocale } from '@/app/hooks/localization/localization';

import type { CompanyAgreementsContent } from './company-agreements.type';

export default function Agreements() {
  const { language } = useLanguage();
  const content = useLocale<CompanyAgreementsContent>(locale, language);

  return (
    <main className={styles.agreements}>
      <header className={styles.agreements__hero}>
        <p className={styles.agreements__eyebrow}>{content.hero.eyebrow}</p>
        <h1 className={styles.agreements__title}>{content.hero.title}</h1>
        <p className={styles.agreements__lede}>{content.hero.lede}</p>
      </header>

      <section className={styles.agreements__section} aria-label={content.sections.overview.title}>
        <h2 className={styles.agreements__heading}>{content.sections.overview.title}</h2>
        <p className={styles.agreements__text}>{content.sections.overview.text}</p>
      </section>

      <section className={styles.agreements__section} aria-label={content.sections.guidance.title}>
        <h2 className={styles.agreements__heading}>{content.sections.guidance.title}</h2>
        <p className={styles.agreements__text}>{content.sections.guidance.text}</p>
      </section>

      <section className={styles.agreements__section} aria-label={content.sections.service.title}>
        <h2 className={styles.agreements__heading}>{content.sections.service.title}</h2>
        <p className={styles.agreements__text}>{content.sections.service.text}</p>
      </section>

      <section className={styles.agreements__section} aria-label={content.sections.vat.title}>
        <h2 className={styles.agreements__heading}>{content.sections.vat.title}</h2>
        <p className={styles.agreements__text}>{content.sections.vat.text}</p>
      </section>

      <section className={styles.agreements__section} aria-label={content.sections.logistics.title}>
        <h2 className={styles.agreements__heading}>{content.sections.logistics.title}</h2>
        <p className={styles.agreements__text}>{content.sections.logistics.text}</p>
      </section>

      <section className={styles.agreements__section} aria-label={content.sections.contact.title}>
        <h2 className={styles.agreements__heading}>{content.sections.contact.title}</h2>
        <div className={styles.agreements__contact}>
          <div className={styles.agreements__contact_item}>
            <span className={styles.agreements__contact_label}>Address</span>
            <strong className={styles.agreements__contact_value}>
              {content.sections.contact.address}
            </strong>
          </div>
          <div className={styles.agreements__contact_item}>
            <span className={styles.agreements__contact_label}>Phone</span>
            <strong className={styles.agreements__contact_value}>
              {content.sections.contact.phone}
            </strong>
          </div>
          <div className={styles.agreements__contact_item}>
            <span className={styles.agreements__contact_label}>Email</span>
            <strong className={styles.agreements__contact_value}>
              {content.sections.contact.email}
            </strong>
          </div>
        </div>
        <p className={styles.agreements__text}>{content.sections.contact.note}</p>
      </section>
    </main>
  );
}
