import type { ReactNode } from 'react';

import '@/styles/globals.scss';

export default function GraphLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <div className="graph-layout">
      {/* <Sidebar /> */}
      <main className="graph-main">{children}</main>
    </div>
  );
}
