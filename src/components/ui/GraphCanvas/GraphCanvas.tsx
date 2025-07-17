'use client';

import type { ReactNode } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import type { Connection, Edge, Node } from 'reactflow';
import ReactFlow, {
  addEdge,
  Background,
  BaseEdge,
  Controls,
  getBezierPath,
  Handle,
  Position,
  useEdgesState,
  useNodesState,
} from 'reactflow';

import { runForceLayout } from '@/lib/forceLayout';
import ToolbarDemo from '../mainToolbar/mainToolbar';
import { useEntites } from '@/contexts/nodes.context';
import type { IEntity, ITag } from '@/types/node.interface';

import 'reactflow/dist/style.css';
import './graphCanvas.scss';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  entityNode: EntityNode,
  tagNode: TagNode,
};

const edgeTypes = {
  'custom-edge': CustomEdge,
};

export default function GraphCanvas(): ReactNode {
  const uNodes = useEntites();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [newEdges, _setNewEdges] = useState<Edge[]>([]);

  useEffect(() => {
    uNodes.entities.forEach((entity) => {
      addNode(entity, 'entityNode');
      entity.tags.forEach((tag) => {
        addNodeTags(tag, 'tagNode');
        newEdges.push({
          id: `${entity.id.toString()}->${tag.key}`,
          source: entity.id.toString(),
          target: tag.key,
          type: 'custom-edge',
        });
      });
    });
    _setNewEdges(newEdges);
  }, [uNodes.entities]);

  const onConnect = useCallback(
    (connection: any) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const addNode = (entity: IEntity, nodetype: 'entityNode' | 'tagNode') => {
    const newNode: Node = {
      id: entity.id.toString(),
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
      data: { label: entity.label },
      type: nodetype,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // TODO remove
  const addNodeTags = (entity: ITag, nodetype: 'entityNode' | 'tagNode') => {
    const newNode: Node = {
      id: entity.key,
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
      data: { label: entity.label },
      type: nodetype,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const animateLayout = async () => {
    setEdges(newEdges);
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
      <ToolbarDemo clean={animateLayout} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
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

function EntityNode(props: any) {
  console.log('props: ', props);

  const openEditPopup = () => {
    const width = 600;
    const height = 500;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const features = `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`;

    window.open('/', '_blank', features);
  };

  return (
    <div className="rounded-node" onClick={openEditPopup}>
      <div>
        <label htmlFor="text">{props.data.label}</label>
        <Handle type="source" position={Position.Bottom} />
      </div>
    </div>
  );
}

function TagNode(props: any) {
  console.log('props: ', props);

  return (
    <div className="rounded-tag-node" onClick={() => {}}>
      <div>
        <label htmlFor="text">{props.data.label}</label>
        <Handle type="target" position={Position.Top} />
      </div>
    </div>
  );
}

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: {
  id: any;
  sourceX: any;
  sourceY: any;
  targetX: any;
  targetY: any;
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
}
