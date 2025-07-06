'use client';

import type { ReactNode } from 'react';
import React, { useCallback, useEffect } from 'react';
import type { Connection, Edge, Node } from 'reactflow';

import ReactFlow, { addEdge, Background, Controls, useEdgesState, useNodesState } from 'reactflow';
import { Button } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { runForceLayout } from '@/app/lib/forceLayout';

import 'reactflow/dist/style.css';
import './GraphCanvas.scss';
import ToolbarDemo from '../MainToolbar/MainToolbar';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  textUpdater: RoundedNode,
};

export default function GraphCanvas(): ReactNode {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    animateLayout();
  }, [nodes]);

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

  const animateLayout = async () => {
    const layouted = await runForceLayout(
      nodes.map((n) => ({ id: n.id })),
      edges.map((e) => ({ source: e.source, target: e.target }))
    );

    const duration = 500;
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);

    const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
    const layoutMap = Object.fromEntries(layouted.map((n) => [n.id, n]));

    let frame = 0;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;

      const interpolatedNodes = nodes.map((n) => {
        const target = layoutMap[n.id];
        const current = nodeMap[n.id];

        const x = current.position.x + (target.x - current.position.x) * progress;
        const y = current.position.y + (target.y - current.position.y) * progress;

        return {
          ...n,
          position: { x, y },
        };
      });

      setNodes(interpolatedNodes);

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="graph-wrapper">
      <ToolbarDemo addNode={addNode} />
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
