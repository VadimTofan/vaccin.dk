'use client';

import styles from './page.module.scss';

import locale from './locale.json';

import { useLanguage, useLocale } from '@/app/hooks/localization/localization';

import type { ContactContent } from './contact.type';

export default function Contact() {
  const { language } = useLanguage();
  const content = useLocale<ContactContent>(locale, language);

  return (
    <main className={styles.contact}>
      <header className={styles.contact__hero}>
        <div className={styles.contact__hero_copy}>
          <p className={styles.contact__eyebrow}>{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          {content.hero.lead.map((text) => (
            <p className={styles.contact__lede} key={text}>
              {text}
            </p>
          ))}
          <div className={styles.contact__actions}>
            <button className={styles.contact__button_primary} type="button">
              {content.hero.actions.call}
            </button>
            <button className={styles.contact__button_ghost} type="button">
              {content.hero.actions.write}
            </button>
          </div>
        </div>
        <section className={styles.contact__card} aria-labelledby="clinic-details-title">
          <h2 id="clinic-details-title">{content.contact.title}</h2>
          <address>
            <div className={styles.contact__detail}>
              <span>{content.contact.phone}</span>
              <strong>{content.contact.phoneValue}</strong>
            </div>
            <div className={styles.contact__detail}>
              <span>{content.contact.email}</span>
              <strong>{content.contact.emailValue}</strong>
            </div>
            <div className={styles.contact__detail}>
              <span>{content.contact.address}</span>
              <strong>{content.contact.addressValue}</strong>
            </div>
            <div className={styles.contact__detail}>
              <span>{content.contact.instagram}</span>
              <strong>{content.contact.instagramValue}</strong>
            </div>
            <div className={styles.contact__detail}>
              <span>{content.contact.facebook}</span>
              <strong>{content.contact.facebookValue}</strong>
            </div>
          </address>
        </section>
      </header>

      <section className={styles.contact__grid} aria-label={content.sections.highlights}>
        <article className={styles.contact__feature}>
          <h3>{content.features.certificate.title}</h3>
          <p className={styles.contact__feature_text}>{content.features.certificate.text}</p>
        </article>
        <article className={styles.contact__feature}>
          <h3>{content.features.documentation.title}</h3>
          <p className={styles.contact__feature_text}>{content.features.documentation.text}</p>
        </article>
        <article className={styles.contact__feature}>
          <h3>{content.features.help.title}</h3>
          <p className={styles.contact__feature_text}>{content.features.help.text}</p>
        </article>
      </section>

      <section className={styles.contact__grid} aria-label={content.sections.consultation}>
        <article className={styles.contact__feature}>
          <h3>{content.features.consultation.title}</h3>
          <p className={styles.contact__feature_text}>{content.features.consultation.text}</p>
        </article>
        <article className={styles.contact__feature}>
          <h3>{content.features.travel.title}</h3>
          <p className={styles.contact__feature_text}>{content.features.travel.text}</p>
        </article>
        <article className={styles.contact__feature}>
          <h3>{content.features.advice.title}</h3>
          <p className={styles.contact__feature_text}>{content.features.advice.text}</p>
        </article>
      </section>

      <section className={styles.contact__grid} aria-label={content.sections.about}>
        <article className={styles.contact__feature}>
          <h3>{content.features.team.title}</h3>
          <p className={styles.contact__feature_text}>{content.features.team.text}</p>
        </article>
        <article className={styles.contact__feature}>
          <h3>{content.features.facility.title}</h3>
          <p className={styles.contact__feature_text}>{content.features.facility.text}</p>
        </article>
      </section>

      <section className={styles.contact__form_wrap} aria-labelledby="contact-form-title">
        <div className={styles.contact__form_intro}>
          <h2 id="contact-form-title">{content.form.title}</h2>
          <p className={styles.contact__form_text}>{content.form.text}</p>
        </div>
        <form className={styles.contact__form}>
          <label className={styles.contact__label} htmlFor="contact-name">
            {content.form.fields.name}
          </label>
          <input
            className={styles.contact__input}
            id="contact-name"
            type="text"
            name="name"
            placeholder={content.form.placeholders.name}
            autoComplete="name"
          />
          <label className={styles.contact__label} htmlFor="contact-email">
            {content.form.fields.email}
          </label>
          <input
            className={styles.contact__input}
            id="contact-email"
            type="email"
            name="email"
            placeholder={content.form.placeholders.email}
            autoComplete="email"
          />
          <label className={styles.contact__label} htmlFor="contact-phone">
            {content.form.fields.phone}
          </label>
          <input
            className={styles.contact__input}
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder={content.form.placeholders.phone}
            autoComplete="tel"
          />
          <label className={styles.contact__label} htmlFor="contact-message">
            {content.form.fields.message}
          </label>
          <textarea
            className={styles.contact__textarea}
            id="contact-message"
            name="message"
            rows={5}
            placeholder={content.form.placeholders.message}
          />
          <button className={styles.contact__button_primary} type="submit">
            {content.form.submit}
          </button>
        </form>
      </section>
    </main>
  );
}
