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
    <section className={styles.notfound} role="status" aria-live="polite">
      <div className={styles.notfound__badge}>404</div>
      <div className={styles.notfound__content}>
        <h1 className={styles.notfound__title}>{title}</h1>
        <p className={styles.notfound__message}>{message}</p>
        <Link className={styles.notfound__button} href={href}>
          {actionLabel}
        </Link>
      </div>
    </section>
  );
}
