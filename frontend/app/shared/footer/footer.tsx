'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useLanguage, useLocale } from '@/app/hooks/localization/localization';
import { FacebookIcon, InstagramIcon, LinkedInIcon } from '@/app/hooks/svg-editor/svg-editor';

import locale from '../navbar/locale.json';
import styles from './page.module.scss';

const information = {
  address: 'Amager Landevej 31',
  city: '2770 Kastrup',
  email: 'klinik@rcscanning.com',
  hours: '08:00 - 16:00',
  phone: '(+45) 54 55 89 65',
};

const socialProfiles = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/vaccin.dk.7',
    icon: <InstagramIcon />,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/vaccin.dk.7',
    icon: <FacebookIcon />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/vaccin.dk.7',
    icon: <LinkedInIcon />,
  },
];

export function Footer() {
  const { language } = useLanguage();
  const content = useLocale(locale, language);
  const usefulLinks = content.nav.filter((item) => item.name !== 'Services');

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__statement}>
          <div className={styles.footer__identity}>
            <Link href="/" className={styles.footer__brand} aria-label={content.shell.brandHome}>
              <span className={styles.footer__brand_mark} aria-hidden="true">
                V
              </span>
              <span className={styles.footer__brand_name}>Vaccin.dk</span>
            </Link>
            <p className={styles.footer__eyebrow}>{content.footerCopy.eyebrow}</p>
          </div>

          <h2 className={styles.footer__heading}>{content.footerCopy.heading}</h2>
          <p className={styles.footer__intro}>{content.footerCopy.intro}</p>
          <Link href="/contact" className={styles.footer__cta}>
            {content.footerCopy.contact}
            <span className={styles.footer__arrow} aria-hidden="true">
              ↗
            </span>
          </Link>

          <ul className={styles.footer__socials} aria-label={content.footerCopy.socialMedia}>
            {socialProfiles.map((social) => (
              <li className={styles.footer__social_item} key={social.name}>
                <Link
                  aria-label={social.name}
                  className={styles.footer__social_link}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footer__directory}>
          <nav aria-label={content.footerCopy.servicesLabel} className={styles.footer__group}>
            <h3 className={styles.footer__title}>{content.footer.services}</h3>
            <ul className={styles.footer__list}>
              {content.services.map((item) => (
                <li className={styles.footer__item} key={item.path}>
                  <Link href={item.path} className={styles.footer__link}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={content.footerCopy.usefulLinksLabel} className={styles.footer__group}>
            <h3 className={styles.footer__title}>{content.footer.links}</h3>
            <ul className={styles.footer__list}>
              {usefulLinks.map((item) => (
                <li className={styles.footer__item} key={item.path}>
                  <Link href={item.path} className={styles.footer__link}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className={styles.footer__address}>
            <h3 className={styles.footer__title}>{content.footer.information}</h3>
            <Link
              className={styles.footer__contact}
              href="https://www.google.com/maps/place/Amager+Landevej+31,+2770+Kastrup/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/images/map-pin.svg" width={16} height={16} alt="" />
              <span>
                {information.address}
                <br />
                {information.city}
              </span>
            </Link>
            <span className={styles.footer__contact}>
              <Image src="/images/clock.svg" width={16} height={16} alt="" />
              {information.hours}
            </span>
            <Link className={styles.footer__contact} href={`mailto:${information.email}`}>
              <Image src="/images/mail.svg" width={16} height={16} alt="" />
              {information.email}
            </Link>
            <Link className={styles.footer__contact} href="tel:+4554558965">
              <Image src="/images/phone.svg" width={16} height={16} alt="" />
              {information.phone}
            </Link>
          </address>
        </div>

        <div className={styles.footer__baseline}>
          <span>Vaccin.dk</span>
          <span>{content.footerCopy.baseline}</span>
        </div>
      </div>
    </footer>
  );
}
