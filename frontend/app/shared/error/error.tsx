import styles from './page.module.scss';

import type { ErrorStateProps } from './error.type';

export function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this content. Please try again.',
  actionLabel = 'Try again',
  onRetry,
}: ErrorStateProps) {
  return (
    <section className={styles.error} role="alert" aria-live="polite">
      <div className={styles.error__content}>
        <div className={styles.error__badge}>!</div>
        <div className={styles.error__text}>
          <h2 className={styles.error__title}>{title}</h2>
          <p className={styles.error__message}>{message}</p>
        </div>
      </div>
      {onRetry && (
        <button className={styles.error__button} type="button" onClick={onRetry}>
          {actionLabel}
        </button>
      )}
    </section>
  );
}
