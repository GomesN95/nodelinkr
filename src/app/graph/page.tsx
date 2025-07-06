'use client';

import { ReactFlowProvider } from 'reactflow';
import type { ReactNode } from 'react';

import GraphLayout from '@/components/layout/graphLayout';
import GraphCanvas from '@/components/ui/graphCanvas/graphCanvas';

export default function GraphPage(): ReactNode {
  return (
    <ReactFlowProvider>
      <GraphLayout>
        <GraphCanvas />
      </GraphLayout>
    </ReactFlowProvider>
  );
}
