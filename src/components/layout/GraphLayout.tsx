import Sidebar from '../ui/Sidebar';
import '@/styles/globals.scss';

export default function GraphLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="graph-layout">
      <Sidebar />
      <main className="graph-main">{children}</main>
    </div>
  );
}
