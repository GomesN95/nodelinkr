import type { ReactNode } from 'react';

import styles from './page.module.scss';

export default function Home(): ReactNode {
  return (
    <main className={styles.main}>
      <section className={styles.welcomeSection}>
        <h1>Welcome to Nodelinkr 👋</h1>
        <p>Visualisez et gérez les connexions entre vos comptes en ligne.</p>
        <a href="/graph" style={{ color: 'blue', textDecoration: 'underline' }}>
          Démarrer le graphe →
        </a>
      </section>
    </main>
  );
}
