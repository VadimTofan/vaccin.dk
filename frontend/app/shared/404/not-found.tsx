import styles from './page.module.scss';

import Link from 'next/link';

import type { NotFoundStateProps } from './not-found.type';

export function NotFoundState({
  title = 'Page not found',
  message = "We couldn't find the page you're looking for.",
  actionLabel = 'Back to home',
  href = '/',
}: NotFoundStateProps) {
  return (
    <section className={styles.not_found} role="status" aria-live="polite">
      <div className={styles.not_found__badge}>404</div>
      <div className={styles.not_found__content}>
        <h1 className={styles.not_found__title}>{title}</h1>
        <p className={styles.not_found__message}>{message}</p>
        <Link className={styles.not_found__button} href={href}>
          {actionLabel}
        </Link>
      </div>
    </section>
  );
}
