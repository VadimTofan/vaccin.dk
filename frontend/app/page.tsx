import Image from 'next/image';
import Link from 'next/link';

import styles from './page.module.scss';

const clinicFacts = [
  {
    value: '08-16',
    label: 'Weekday clinic',
  },
  {
    value: '+45',
    label: 'Phone guidance',
  },
  {
    value: 'CPH',
    label: 'Kastrup location',
  },
];

const travelServices = [
  {
    title: 'Destination advice',
    text: 'Country-specific guidance before you book vaccines.',
    href: '/destination',
  },
  {
    title: 'Vaccines',
    text: 'Review doses, protection windows, and practical pricing.',
    href: '/vaccines',
  },
  {
    title: 'Company agreements',
    text: 'Vaccination planning for teams with recurring travel.',
    href: '/company-agreements',
  },
  {
    title: 'Narco test',
    text: 'Discreet clinic testing with clear instructions before arrival.',
    href: '/narco-test',
  },
];

const travelPlan = [
  'Share destination, dates, and travel style.',
  'Get a practical vaccination plan from the clinic.',
  'Leave with vaccine documentation ready for your trip.',
];

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.home__hero} aria-labelledby="home-title">
        <div className={styles.home__hero_content}>
          <p className={styles.home__kicker}>Welcome to VACCIN DK</p>
          <h1 id="home-title" className={styles.home__title}>
            Departure-ready travel health
          </h1>
          <p className={styles.home__lead}>
            Vaccination guidance, travel certificates, and clinic appointments for people leaving
            Denmark.
          </p>

          <div className={styles.home__actions} aria-label="Primary actions">
            <Link className={styles.home__primary} href="/contact">
              Book contact
            </Link>
            <Link className={styles.home__secondary} href="/destination">
              Choose destination
            </Link>
          </div>
        </div>

        <div className={styles.home__route_map} aria-label="Travel planning summary">
          <div className={styles.home__orbit} aria-hidden="true">
            <span className={styles.home__route_line} />
            <span className={styles.home__route_pin} />
            <span className={styles.home__route_pin_alt} />
          </div>

          <aside className={styles.home__glass}>
            <Image
              className={styles.home__logo}
              src="/images/logo.webp"
              width={120}
              height={80}
              alt="VACCIN DK clinic logo"
              priority
            />
            <div className={styles.home__glass_copy}>
              <p className={styles.home__label}>Clinic signal</p>
              <h2 className={styles.home__glass_title}>
                Call before booking so the visit matches the trip.
              </h2>
              <p className={styles.home__glass_text}>
                Amager Landevej 31, 2770 Kastrup · (+45) 54 55 89 65
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.home__facts} aria-label="Clinic highlights">
        {clinicFacts.map((fact) => (
          <div className={styles.home__fact} key={fact.label}>
            <strong className={styles.home__fact_value}>{fact.value}</strong>
            <span className={styles.home__fact_label}>{fact.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.home__section} aria-labelledby="services-title">
        <div className={styles.home__section_header}>
          <p className={styles.home__label}>Travel services</p>
          <h2 id="services-title" className={styles.home__heading}>
            Start with the route, finish with the right protection.
          </h2>
        </div>

        <div className={styles.home__service_grid}>
          {travelServices.map((service) => (
            <Link className={styles.home__service} href={service.href} key={service.title}>
              <span className={styles.home__service_title}>{service.title}</span>
              <span className={styles.home__service_text}>{service.text}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.home__process} aria-labelledby="process-title">
        <div className={styles.home__section_header}>
          <p className={styles.home__label}>Before the appointment</p>
          <h2 id="process-title" className={styles.home__heading}>
            A cleaner way to plan vaccines before you travel.
          </h2>
        </div>

        <ol className={styles.home__timeline}>
          {travelPlan.map((item, index) => (
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
          <span className={styles.home__certificate_stamp}>Certificate</span>
        </div>

        <div className={styles.home__certificate_copy}>
          <p className={styles.home__label}>Documentation included</p>
          <h2 id="certificate-title" className={styles.home__heading}>
            Vaccination Certificate
          </h2>
          <p className={styles.home__text}>
            After receiving your vaccines, you receive a vaccination card that can be shown when
            documentation is requested for your destination.
          </p>
        </div>
      </section>

      <section className={styles.home__visit} aria-labelledby="visit-title">
        <p className={styles.home__label}>Visit the clinic</p>
        <h2 id="visit-title" className={styles.home__visit_title}>
          Practical travel health from Kastrup, with free parking at the door.
        </h2>
        <Link className={styles.home__primary} href="/contact">
          Write or call the clinic
        </Link>
      </section>
    </div>
  );
}
