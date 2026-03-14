import styles from './page.module.scss';

import type { LoadingStateProps } from './loading.type';

export function LoadingState({ label = 'Loading' }: LoadingStateProps) {
  return (
    <section className={styles.loading} role="status" aria-live="polite">
      <div className={styles.loading__spinner} aria-hidden="true"></div>
      <p className={styles.loading__label}>{label}</p>
    </section>
  );
}
