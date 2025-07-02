'use client';

import type { ReactNode } from 'react';
import React, { useCallback } from 'react';
import type { Connection, Edge, Node } from 'reactflow';
import ReactFlow, { addEdge, Background, Controls, useEdgesState, useNodesState } from 'reactflow';
import { Button } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

import 'reactflow/dist/style.css';
import './GraphCanvas.scss';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  textUpdater: RoundedNode,
};

export default function GraphCanvas(): ReactNode {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Edge | Connection) => {
    setEdges((eds) => addEdge(params, eds));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNode = () => {
    const id = `${nodes.length + 1}`;
    const newNode: Node = {
      id,
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
      data: { label: `Node ${id}` },
      type: 'textUpdater',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="graph-wrapper">
      <Button onClick={addNode}>
        <PlusIcon /> Ajouter un node
      </Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

function RoundedNode() {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="rounded-node">
      <div>
        <label htmlFor="text">Text:</label>
      </div>
    </div>
  );
}
