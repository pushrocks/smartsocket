export interface IRequestAuthPayload {
  serverShortId: string;
}

export type TConnectionStatus = 'new' | 'connecting' | 'connected' | 'disconnecting' | 'disconnected';
