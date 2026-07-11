'use client';

import Link from 'next/link';

import { useLanguage, useLocale } from './hooks/localization/localization';
import locale from './locale.json';
import styles from './page.module.scss';

export default function Home() {
  const { language } = useLanguage();
  const content = useLocale(locale, language);

  return (
    <div className={styles.home}>
      <section className={styles.home__hero} aria-labelledby="home-title">
        <div className={styles.home__hero_content}>
          <p className={styles.home__kicker}>{content.hero.eyebrow}</p>
          <h1 id="home-title" className={styles.home__title}>
            {content.hero.title}
          </h1>
          <p className={styles.home__lead}>{content.hero.lead}</p>

          <div className={styles.home__actions} aria-label={content.hero.actionsLabel}>
            <Link className={styles.home__primary} href="/contact">
              {content.hero.contactAction}
            </Link>
            <Link className={styles.home__secondary} href="/destination">
              {content.hero.destinationAction}
            </Link>
          </div>
        </div>

        <div className={styles.home__route_map} aria-label={content.hero.summaryLabel}>
          <div className={styles.home__orbit} aria-hidden="true">
            <span className={styles.home__route_line} />
            <span className={styles.home__route_pin} />
            <span className={styles.home__route_pin_alt} />
          </div>

          <aside className={styles.home__glass}>
            <div className={styles.home__glass_copy}>
              <p className={styles.home__label}>{content.hero.signalLabel}</p>
              <h2 className={styles.home__glass_title}>{content.hero.signalTitle}</h2>
              <p className={styles.home__glass_text}>
                Amager Landevej 31, 2770 Kastrup · (+45) 54 55 89 65
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.home__facts} aria-label={content.facts.label}>
        {content.facts.items.map((fact) => (
          <div className={styles.home__fact} key={fact.label}>
            <strong className={styles.home__fact_value}>{fact.value}</strong>
            <span className={styles.home__fact_label}>{fact.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.home__section} aria-labelledby="services-title">
        <div className={styles.home__section_header}>
          <p className={styles.home__label}>{content.services.eyebrow}</p>
          <h2 id="services-title" className={styles.home__heading}>
            {content.services.title}
          </h2>
        </div>

        <div className={styles.home__service_grid}>
          {content.services.items.map((service) => (
            <Link className={styles.home__service} href={service.href} key={service.title}>
              <span className={styles.home__service_title}>{service.title}</span>
              <span className={styles.home__service_text}>{service.text}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.home__process} aria-labelledby="process-title">
        <div className={styles.home__section_header}>
          <p className={styles.home__label}>{content.process.eyebrow}</p>
          <h2 id="process-title" className={styles.home__heading}>
            {content.process.title}
          </h2>
        </div>

        <ol className={styles.home__timeline}>
          {content.process.items.map((item, index) => (
            <li className={styles.home__timeline_item} key={item}>
              <span className={styles.home__timeline_number}>0{index + 1}</span>
              <span className={styles.home__timeline_text}>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.home__certificate} aria-labelledby="certificate-title">
        <div className={styles.home__certificate_mark} aria-hidden="true">
          <span className={styles.home__certificate_code}>VACCIN DK</span>
          <span className={styles.home__certificate_line} />
          <span className={styles.home__certificate_stamp}>{content.certificate.stamp}</span>
        </div>

        <div className={styles.home__certificate_copy}>
          <p className={styles.home__label}>{content.certificate.eyebrow}</p>
          <h2 id="certificate-title" className={styles.home__heading}>
            {content.certificate.title}
          </h2>
          <p className={styles.home__text}>{content.certificate.text}</p>
        </div>
      </section>

      <section className={styles.home__visit} aria-labelledby="visit-title">
        <p className={styles.home__label}>{content.visit.eyebrow}</p>
        <h2 id="visit-title" className={styles.home__visit_title}>
          {content.visit.title}
        </h2>
        <Link className={styles.home__primary} href="/contact">
          {content.visit.action}
        </Link>
      </section>
    </div>
  );
}
