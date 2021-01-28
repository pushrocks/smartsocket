export interface ITag<T = any> {
  id: string;
  payload: T;
}

export type TTagStore = { [key: string]: ITag };
