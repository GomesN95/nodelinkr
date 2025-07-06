import type { ReactNode } from 'react';

import './Sidebar.scss';

export default function Sidebar(): ReactNode {
  return (
    <aside className="sidebar">
      <div>
        <button />
      </div>
      <h2>Panel</h2>
      <p>Édition des nodes à venir.</p>
    </aside>
  );
}
