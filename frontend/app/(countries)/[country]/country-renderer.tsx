'use client';

import styles from './country-renderer.module.scss';

import { useLanguage, useLocale } from '@/app/hooks/localization/localization';

import type {
  CountryRendererProps,
  RecommendedItem,
  RecommendedItemsSource,
} from './country-content.type';

function getRecommendedItems(items: RecommendedItemsSource) {
  if (Array.isArray(items)) {
    return items;
  }
  return Object.entries(items).map(([key, value]) => ({
    ...value,
    href: value.href ?? `/vaccines/${encodeURIComponent(key).replace(/%20/g, '%20')}`,
  })) as RecommendedItem[];
}

export function CountryRenderer({ country, locale }: CountryRendererProps) {
  const { language } = useLanguage();
  const content = useLocale(locale, language);

  const recommendedItems = getRecommendedItems(content.sections.recommended.items);

  return (
    <main className={styles.country}>
      <header className={styles.country__hero}>
        <p className={styles.country__eyebrow}>{content.hero.eyebrow}</p>
        <h1 className={styles.country__title}>{content.hero.title}</h1>
      </header>

      <section className={styles.country__image_wrap} aria-label={content.hero.imageAlt}>
        <img
          className={styles.country__image}
          src={`/images/countries/${country}.webp`}
          alt={content.hero.imageAlt}
          width={1200}
          height={400}
        />
      </section>

      <section className={styles.country__section} aria-labelledby="recommended-vaccines">
        <h2 id="recommended-vaccines" className={styles.country__heading}>
          {content.sections.recommended.title}
        </h2>
        <p className={styles.country__subheading}>{content.sections.recommended.subtitle}</p>
        <div className={styles.country__grid}>
          {recommendedItems.map((item) => (
            <article key={item.title} className={styles.country__card}>
              <h3 className={styles.country__card_title}>
                <a className={styles.country__link} href={item.href ?? '#'}>
                  {item.title}
                </a>
              </h3>
              <p className={styles.country__text}>{item.text}</p>
              <a className={styles.country__link} href={item.href ?? '#'}>
                {item.link}
              </a>
            </article>
          ))}
        </div>
        <div className={styles.country__cta_wrap}>
          <a className={styles.country__cta} href="/contact">
            {content.sections.recommended.cta}
          </a>
          <p className={styles.country__note}>{content.sections.recommended.note}</p>
        </div>
      </section>

      <section className={styles.country__section} aria-labelledby={`about-${country}`}>
        <h2 id={`about-${country}`} className={styles.country__heading}>
          {content.sections.about.title}
        </h2>
        <div className={styles.country__columns}>
          <div className={styles.country__copy}>
            <p className={styles.country__text}>{content.sections.about.text}</p>
            <p className={styles.country__text}>{content.sections.about.textTwo}</p>
            <p className={styles.country__emphasis}>{content.sections.about.notice}</p>
            <p className={styles.country__text}>
              {content.sections.about.sourcePrefix}{' '}
              <a
                className={styles.country__link}
                href={content.sections.about.sourceHref}
                rel="external nofollow noopener"
                target="_blank"
              >
                {content.sections.about.sourceLabel}
              </a>
              .
            </p>
            <p className={styles.country__text}>{content.sections.about.footer}</p>
          </div>
          <div
            className={styles.country__map_placeholder}
            aria-label={content.sections.about.mapNote}
          >
            <p className={styles.country__map_text}>{content.sections.about.mapNote}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
