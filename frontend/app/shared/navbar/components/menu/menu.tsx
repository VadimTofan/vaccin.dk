import styles from './page.module.scss';
import { useLanguage, useLocale } from '@/app/hooks/localization/localization';
import locale from '../../locale.json';

type MenuProps = {
  isMenuOpen: boolean;
  handleMenu: () => void;
};

export function Menu({ isMenuOpen, handleMenu }: MenuProps) {
  const { language } = useLanguage();
  const content = useLocale(locale, language);

  return (
    <button
      aria-controls="primary-navigation"
      aria-expanded={isMenuOpen}
      aria-label={
        isMenuOpen ? content.shell.closeNavigation : content.shell.openNavigation
      }
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
