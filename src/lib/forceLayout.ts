import type { SimulationNodeDatum } from 'd3-force';
import { forceSimulation, forceManyBody, forceLink, forceCenter, forceCollide } from 'd3-force';

type NodeData = {
  id: string;
};

type LinkData = {
  source: string;
  target: string;
};

export function runForceLayout(
  nodes: NodeData[],
  links: LinkData[],
  width = 800,
  height = 600
): Promise<{ x: number; y: number; id: string }[]> {
  return new Promise((resolve) => {
    const simulation = forceSimulation(nodes as SimulationNodeDatum[])
      .force('charge', forceManyBody().strength(-300))
      .force(
        'link',
        forceLink(links)
          .id((d: any) => d.id)
          .distance(150)
      )
      .force('center', forceCenter(width / 2, height / 2))
      .force('collide', forceCollide(50))
      .stop();

    // Run the simulation for a fixed number of steps
    for (let i = 0; i < 100; i++) simulation.tick();

    resolve(
      nodes.map((n) => ({
        id: n.id,
        x: n.x || 0,
        y: n.y || 0,
      }))
    );
  });
}
