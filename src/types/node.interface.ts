export interface IEntity {
  id: number;
  label: string;
  nodeSettings: {
    position: {
      x: number;
      y: number;
    };
  };
}
