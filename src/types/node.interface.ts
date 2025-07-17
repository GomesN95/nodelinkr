export interface IEntity {
  id: number;
  label: string;
  tags: ITag[];
  // nodeSettings: {
  //   position: {
  //     x: number;
  //     y: number;
  //   };
  // };
}

export interface ITag {
  key: string;
  label: string;
  value: string;
}
