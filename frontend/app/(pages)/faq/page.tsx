'use client';

import styles from './page.module.scss';

import locale from './locale.json';

import { useLanguage, useLocale } from '@/app/hooks/localization/localization';

import type { FaqContent } from './faq.type';

export default function Faq() {
  const { language } = useLanguage();
  const content = useLocale<FaqContent>(locale, language);

  return (
    <main className={styles.faq}>
      <header className={styles.faq__hero}>
        <p className={styles.faq__eyebrow}>{content.hero.eyebrow}</p>
        <h1 className={styles.faq__title}>{content.hero.title}</h1>
        <p className={styles.faq__lead}>{content.hero.lead}</p>
      </header>

      <section className={styles.faq__section} aria-labelledby="faq-questions">
        <h2 id="faq-questions" className={styles.faq__heading}>
          {content.sections.questions.title}
        </h2>
        <div className={styles.faq__list}>
          {content.sections.questions.items.map((item) => (
            <article key={item.question} className={styles.faq__item}>
              <h3 className={styles.faq__question}>{item.question}</h3>
              <p className={styles.faq__answer}>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faq__section} aria-labelledby="faq-contact">
        <h2 id="faq-contact" className={styles.faq__heading}>
          {content.sections.contact.title}
        </h2>
        <p className={styles.faq__text}>{content.sections.contact.text}</p>
        <address className={styles.faq__contact}>
          <p className={styles.faq__text}>{content.sections.contact.address}</p>
          <p className={styles.faq__text}>{content.sections.contact.hours}</p>
          <p className={styles.faq__text}>{content.sections.contact.phone}</p>
          <p className={styles.faq__text}>{content.sections.contact.email}</p>
        </address>
      </section>
    </main>
  );
}
