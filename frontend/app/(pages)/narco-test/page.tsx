'use client';

import styles from './page.module.scss';

import locale from './locale.json';

import { useLanguage, useLocale } from '@/app/hooks/localization/localization';

import type { NarcoContent } from './narco-test.type';

export default function NarcoTest() {
  const { language } = useLanguage();
  const content = useLocale<NarcoContent>(locale, language);

  return (
    <main className={styles.narco}>
      <header className={styles.narco__hero}>
        <p className={styles.narco__eyebrow}>{content.hero.eyebrow}</p>
        <h1 className={styles.narco__title}>{content.hero.title}</h1>
        <p className={styles.narco__lede}>{content.hero.lede}</p>
      </header>

      <section className={styles.narco__section} aria-label={content.sections.overview.title}>
        <p className={styles.narco__text}>{content.sections.overview.text}</p>
        <ul className={styles.narco__list}>
          {content.sections.overview.list.map((item) => (
            <li className={styles.narco__list_item} key={item}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.narco__section} aria-label={content.sections.companies.title}>
        <h2 className={styles.narco__heading}>{content.sections.companies.title}</h2>
        <p className={styles.narco__text}>{content.sections.companies.text}</p>
        <p className={styles.narco__text}>{content.sections.companies.intro}</p>
        <ul className={styles.narco__list}>
          {content.sections.companies.list.map((item, index) => (
            <li className={styles.narco__list_item} key={index}>
              {item}
            </li>
          ))}
        </ul>
        <p className={styles.narco__text}>{content.sections.companies.note}</p>
      </section>

      <section className={styles.narco__section} aria-label={content.sections.private.title}>
        <h2 className={styles.narco__heading}>{content.sections.private.title}</h2>
        <p className={styles.narco__text}>{content.sections.private.text}</p>
      </section>

      <section className={styles.narco__section} aria-label={content.sections.price.title}>
        <h2 className={styles.narco__heading}>{content.sections.price.title}</h2>
        <p className={styles.narco__price}>{content.sections.price.value}</p>
        <p className={styles.narco__text}>{content.sections.price.note}</p>
      </section>

      <section className={styles.narco__cta} aria-label={content.sections.contact.title}>
        <h2 className={styles.narco__heading}>{content.sections.contact.title}</h2>
        <div className={styles.narco__contact_grid}>
          <div className={styles.narco__contact_item}>
            <span className={styles.narco__contact_label}>Address</span>
            <strong className={styles.narco__contact_value}>
              {content.sections.contact.address}
            </strong>
          </div>
          <div className={styles.narco__contact_item}>
            <span className={styles.narco__contact_label}>Hours</span>
            <strong className={styles.narco__contact_value}>
              {content.sections.contact.hours}
            </strong>
          </div>
          <div className={styles.narco__contact_item}>
            <span className={styles.narco__contact_label}>Phone</span>
            <strong className={styles.narco__contact_value}>
              {content.sections.contact.phone}
            </strong>
          </div>
        </div>
        <p className={styles.narco__text}>{content.sections.contact.note}</p>
      </section>
    </main>
  );
}
