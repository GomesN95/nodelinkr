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
        label: 'Kraken',
        tags: [
          {
            key: '928370326594286y34',
            label: 'BTC',
            value: '250',
          },
          {
            key: '9283703265942324286y34',
            label: 'DOGE',
            value: '2500',
          },
          {
            key: '92837743982594286y34',
            label: 'BNB',
            value: '200',
          },
        ],
      },
      {
        id: 2,
        label: 'Binance',
        tags: [
          {
            key: '9892837743982594286y34',
            label: 'BTC',
            value: '200',
          },
          {
            key: '928377423463982594286y34',
            label: 'POL',
            value: '600',
          },
          {
            key: '9122837743982594286y34',
            label: 'XRP',
            value: '1000',
          },
        ],
      },
      {
        id: 3,
        label: 'Ledger',
        tags: [
          {
            key: '92837654743982594286y34',
            label: 'BTC',
            value: '1000',
          },
          {
            key: '9283774398452594286y34',
            label: 'ETH',
            value: '1000',
          },
          {
            key: '92837741233982594286y34',
            label: 'SOL',
            value: '1000',
          },
        ],
      },
      {
        id: 4,
        label: 'Meria',
        tags: [],
      },
    ]);
  }, []);

  const addEntity = (newEntity?: IEntity) => {
    if (newEntity) {
      _setEntities((oldEntities) => [...oldEntities, newEntity]);
    } else {
      _setEntities((oldEntities) => [
        ...oldEntities,
        { id: entities.length + 1, label: 'New', tags: [] },
      ]);
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
