'use client';

import styles from './page.module.scss';

import locale from '../navbar/locale.json';

import Link from 'next/link';
import Image from 'next/image';
import { FacebookIcon, LinkedInIcon, InstagramIcon } from '@/app/hooks/svg-editor/svg-editor';
import { useLanguage, useLocale } from '@/app/hooks/localization/localization';
import { useEffect, useState } from 'react';

export function Footer() {
  const [state, setState] = useState({ content: locale.da });
  const { content } = state;

  const { language } = useLanguage();
  const data = useLocale(locale, language);
  useEffect(() => {
    setState((prev) => ({ ...prev, content: data }));
  }, [data]);

  const socials = [
    { name: 'Instagram', render: <InstagramIcon /> },
    { name: 'Facebook', render: <FacebookIcon /> },
    { name: 'LinkedIn', render: <LinkedInIcon /> },
  ];

  const usefulLinks = content.nav.filter((item) => item.name !== 'Services');

  const information = {
    address: 'Amager Landevej 31',
    code: '2770, Kastrup',
    hours: '8:00 - 16:00',
    phone: '(+45) 54 55 89 65',
    email: 'klinik@rcscanning.com',
  };

  return (
    <nav className={styles.footer}>
      <div className={styles.footer__left}>
        <div className={styles.footer__credits}>
          <Link href="/">
            <Image
              className={styles.footer__logo}
              src="/images/logo.webp"
              width={60}
              height={40}
              alt="logo"
            />
          </Link>
          <h2 className={styles.footer__heading}>Vaccin.dk</h2>
        </div>
        <ul className={styles.footer__socials}>
          {socials.map((social, index) => (
            <li key={index}>
              <Link href={`http://www.${social.name}.com/vaccin.dk.7`} target="_blank">
                {social.render}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.footer__right}>
        <div className={styles.footer__extra}>
          <h3 className={styles.footer__title}>{content.footer.services}</h3>
          <ul className={styles.footer__list}>
            {content.services.map((item) => (
              <li key={item.path} className={styles.footer__links}>
                <Link href={item.path} className={styles.footer__link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.footer__extra}>
          <h3 className={styles.footer__title}>{content.footer.links}</h3>
          <ul className={styles.footer__list}>
            {usefulLinks.map((item) => (
              <li key={item.path} className={styles.footer__links}>
                <Link href={item.path} className={styles.footer__link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.footer__extra}>
          <h3 className={styles.footer__title}>{content.footer.information}</h3>
          <ul className={styles.footer__list}>
            <li className={styles.footer__link}>
              <Link
                href="https://www.google.com/maps/place/Amager+Landevej+31,+2770+Kastrup/"
                className={styles.footer__link}
                target="_blank"
              >
                <Image src="/images/map-pin.svg" width={15} height={15} alt="geo-tag pin" />
                <p>
                  {information.address}
                  <br />
                  {information.code}
                </p>
              </Link>
            </li>
            <li className={styles.footer__link}>
              <Image src="/images/clock.svg" width={15} height={15} alt="small digital clock" />
              {information.hours}
            </li>

            <li className={styles.footer__link}>
              <Link href="" className={styles.footer__link}>
                <Image src="/images/mail.svg" width={15} height={15} alt="mail envelope" />
                {information.email}
              </Link>
            </li>
            <li className={styles.footer__link}>
              {' '}
              <Link href={`tel:${information.phone}`} className={styles.footer__link}>
                <Image src="/images/phone.svg" width={15} height={15} alt="phone" />
                {information.phone}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
