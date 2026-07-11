import styles from './page.module.scss';

type MenuProps = {
  isMenuOpen: boolean;
  handleMenu: () => void;
};

export function Menu({ isMenuOpen, handleMenu }: MenuProps) {
  return (
    <button
      aria-controls="primary-navigation"
      aria-expanded={isMenuOpen}
      aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
      className={styles.menu}
      data-open={isMenuOpen}
      onClick={handleMenu}
      type="button"
    >
      <span className={styles.menu__line} />
      <span className={styles.menu__line} />
      <span className={styles.menu__line} />
    </button>
  );
}
