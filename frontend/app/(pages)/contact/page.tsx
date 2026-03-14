import styles from './page.module.scss';

export default function Contact() {
  return (
    <main className={styles.contact}>
      <header className={styles.contact__hero}>
        <div className={styles.contact__hero_copy}>
          <p className={styles.contact__eyebrow}>Contact</p>
          <h1>Talk to a travel health nurse</h1>
          <p className={styles.contact__lede}>
            Have questions about vaccines, timing, or your trip? We help you plan the right protection with
            clear, practical guidance.
          </p>
          <div className={styles.contact__actions}>
            <button className={styles.contact__button_primary} type="button">
              Book a callback
            </button>
            <button className={styles.contact__button_ghost} type="button">
              See clinic hours
            </button>
          </div>
        </div>
        <section className={styles.contact__card} aria-labelledby="clinic-details-title">
          <h2 id="clinic-details-title">Clinic details</h2>
          <address>
            <div className={styles.contact__detail}>
              <span>Phone</span>
              <strong>+45 12 34 56 78</strong>
            </div>
            <div className={styles.contact__detail}>
              <span>Email</span>
              <strong>kontakt@vaccin.dk</strong>
            </div>
            <div className={styles.contact__detail}>
              <span>Address</span>
              <strong>Vestergade 12, 8000 Aarhus</strong>
            </div>
            <div className={styles.contact__detail}>
              <span>Hours</span>
              <strong>Mon-Fri 08:30-17:00</strong>
            </div>
          </address>
        </section>
      </header>

      <section className={styles.contact__grid} aria-label="Contact highlights">
        <article className={styles.contact__feature}>
          <h3>Fast advice</h3>
          <p className={styles.contact__feature_text}>
            Send us your travel dates and destination. We answer within one business day.
          </p>
        </article>
        <article className={styles.contact__feature}>
          <h3>Personal plan</h3>
          <p className={styles.contact__feature_text}>
            We map your immunizations and recommend a clear schedule before departure.
          </p>
        </article>
        <article className={styles.contact__feature}>
          <h3>Trusted sources</h3>
          <p className={styles.contact__feature_text}>
            Our guidance follows Danish and international vaccination standards.
          </p>
        </article>
      </section>

      <section className={styles.contact__form_wrap} aria-labelledby="contact-form-title">
        <div className={styles.contact__form_intro}>
          <h2 id="contact-form-title">Send a message</h2>
          <p className={styles.contact__form_text}>
            Tell us your destination, travel dates, and any questions. We will reply quickly.
          </p>
        </div>
        <form className={styles.contact__form}>
          <label className={styles.contact__label} htmlFor="contact-name">
            Full name
          </label>
          <input
            className={styles.contact__input}
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="name"
          />
          <label className={styles.contact__label} htmlFor="contact-email">
            Email
          </label>
          <input
            className={styles.contact__input}
            id="contact-email"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <label className={styles.contact__label} htmlFor="contact-phone">
            Phone
          </label>
          <input
            className={styles.contact__input}
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder="+45 12 34 56 78"
            autoComplete="tel"
          />
          <label className={styles.contact__label} htmlFor="contact-message">
            Message
          </label>
          <textarea
            className={styles.contact__textarea}
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Where are you traveling?"
          />
          <button className={styles.contact__button_primary} type="submit">
            Send message
          </button>
        </form>
      </section>
    </main>
  );
}
