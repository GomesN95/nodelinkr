'use client';

import { ReactFlowProvider } from 'reactflow';
import type { ReactNode } from 'react';

import GraphLayout from '@/components/layout/GraphLayout';
import GraphCanvas from '@/components/ui/GraphCanvas/GraphCanvas';

export default function GraphPage(): ReactNode {
  return (
    <ReactFlowProvider>
      <GraphLayout>
        <GraphCanvas />
      </GraphLayout>
    </ReactFlowProvider>
  );
}
