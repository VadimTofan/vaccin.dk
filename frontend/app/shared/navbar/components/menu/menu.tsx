import styles from './page.module.scss';

export function Menu() {
  return (
    <button className={styles.menu}>
      <span className={styles.menu__line}></span>
      <span className={styles.menu__line}></span>
      <span className={styles.menu__line}></span>
    </button>
  );
}
