import { useState } from 'react';
import styles from './page.module.scss';

export function Menu({ isMenuOpen, handleMenu }: any) {
  return (
    <button
      className={`${styles.menu} ${isMenuOpen && styles.menu__open}`}
      onClick={() => {
        handleMenu();
      }}
    >
      <span className={styles.menu__line}></span>
      <span className={styles.menu__line}></span>
      <span className={styles.menu__line}></span>
    </button>
  );
}
