'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { NodeInterface } from '@/types';

interface INodesContext {
  lastExport: number;
  nodes: NodeInterface.INode[];
}

const NodesContext = createContext<INodesContext | undefined>(undefined);

export const NodesProvider = ({ children }: { children: ReactNode }) => {
  const [lastExport, _setLastExport] = useState<number>(0);
  const [nodes, _setNodes] = useState<NodeInterface.INode[]>([]);

  const nodesContext = {
    lastExport,
    nodes,
  };

  return <NodesContext.Provider value={nodesContext}>{children}</NodesContext.Provider>;
};

export const useNodes = (): INodesContext => {
  const context = useContext(NodesContext);
  if (context === undefined) {
    throw new Error('useNodes must be initialised');
  }
  return context;
};
