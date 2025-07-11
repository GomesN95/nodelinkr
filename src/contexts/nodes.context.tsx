'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { NodeInterface } from '@/types';
import type { IEntity } from '@/types/node.interface';

interface INodesContext {
  lastExport: number;
  entities: NodeInterface.IEntity[];
  addEntity: (newEntity?: IEntity) => void;
}

const NodesContext = createContext<INodesContext | undefined>(undefined);

export const NodesProvider = ({ children }: { children: ReactNode }) => {
  const [lastExport, _setLastExport] = useState<number>(0);
  const [entities, _setEntities] = useState<NodeInterface.IEntity[]>([]);

  useEffect(() => {
    _setEntities([
      {
        id: 1,
        label: 'Steam',
        nodeSettings: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        id: 2,
        label: 'Github',
        nodeSettings: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        id: 3,
        label: 'Kraken',
        nodeSettings: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        id: 4,
        label: 'Fujifilm',
        nodeSettings: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
    ]);
  }, []);

  const addEntity = (newEntity?: IEntity) => {
    if (newEntity) {
      _setEntities((oldEntities) => [...oldEntities, newEntity]);
    } else {
      _setEntities((oldEntities) => [...oldEntities, { id: entities.length + 1, label: 'New' }]);
    }
  };

  const nodesContext = {
    lastExport,
    entities,
    addEntity,
  };

  return <NodesContext.Provider value={nodesContext}>{children}</NodesContext.Provider>;
};

export const useEntites = (): INodesContext => {
  const context = useContext(NodesContext);
  if (context === undefined) {
    throw new Error('useEntites must be initialised');
  }
  return context;
};
