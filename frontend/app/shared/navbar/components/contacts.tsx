import styles from './page.module.scss';

import Link from 'next/link';
import Image from 'next/image';

import { useState } from 'react';

export function Contacts() {
  const [state, setState] = useState(false);

  const address = ['Amager', 'Landevej', '31,', '2770'];

  const handleClick = () => {
    if (!state) {
      setState(true);
    } else {
      setState(false);
    }
  };

  return (
    <div className={styles.contacts}>
      {state && (
        <div className={styles.contacts__modal} onClick={handleClick}>
          <form className={styles.contacts__form} onClick={(event) => event.stopPropagation()}>
            <p>TBD</p>
          </form>
        </div>
      )}
      <div className={styles.contacts__location}>
        <Link
          className={styles.contacts__link}
          href={`https://www.google.com/maps/place/${address.join('+')}+Kastrup/`}
          target="_blank"
        >
          <Image
            className={styles.contacts__svg}
            src="/images/map-pin.svg"
            width={20}
            height={20}
            alt="location pin"
          />
          {address.join(' ')}
        </Link>
      </div>
      <div className={styles.contacts__link}>
        <Image
          className={styles.contacts__svg}
          src="/images/clock.svg"
          width={20}
          height={20}
          alt="working hours clock"
        />
        <p className={styles.contacts__hours}>08:00 - 16:00</p>
      </div>
      <div className={styles.contacts__communication}>
        <Link
          className={styles.contacts__link}
          href="mailto:klinik@rcscanning.com"
          onClick={handleClick}
        >
          <Image
            className={styles.contacts__svg}
            src="/images/mail.svg"
            width={20}
            height={20}
            alt="send e-mail button"
          />
          klinik@rcscanning.com
        </Link>
        <Link className={styles.contacts__link} href="tel:+454558965">
          <Image
            className={styles.contacts__svg}
            src="/images/phone.svg"
            width={20}
            height={20}
            alt="call us button"
          />
          (+45) 54 55 89 65
        </Link>
      </div>
    </div>
  );
}
