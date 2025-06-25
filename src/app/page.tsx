import type { ReactNode } from 'react';

import styles from './page.module.scss';

export default function Home(): ReactNode {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Bienvenue sur Nodelinkr 👋</h1>
      <p>
        Visualisez et gérez les connexions entre vos comptes en ligne.
        <br />
        <a href="/graph" style={{ color: 'blue', textDecoration: 'underline' }}>
          Démarrer le graphe →
        </a>
      </p>
    </main>
  );
}
