export type Commands = 'SetId' | 'SetName' | 'GetPlayers' | 'PlayersList' | 'StartGame';

export interface Command extends SessionId {
    command: Commands,
    data?: any
}

export interface SessionId {
    id?: string
}

export const color1 = "warning";
export const color2 = "info";