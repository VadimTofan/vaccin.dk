import styles from './page.module.scss';

type MenuProps = {
  isMenuOpen: boolean;
  handleMenu: () => void;
};

export function Menu({ isMenuOpen, handleMenu }: MenuProps) {
  return (
    <button className={styles.menu} data-open={isMenuOpen} onClick={handleMenu} type="button">
      <span className={styles.menu__line}></span>
      <span className={styles.menu__line}></span>
      <span className={styles.menu__line}></span>
    </button>
  );
}
