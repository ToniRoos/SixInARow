export type Commands = 'SetId' |
    'SetName' |
    'GetPlayers' |
    'PlayersList' |
    'StartGame' |
    'GetTiles' |
    'CheckMove' |
    'RefreshBoard' |
    'NextTurn';

export interface Command extends SessionId {
    command: Commands,
    data?: any
}

export interface SessionId {
    id: string
}

export enum ColorEnum {
    blue = 1,
    green = 2,
    orange = 3,
    yellow = 4,
    red = 5,
    purple = 6
}

export enum SymbolEnum {
    square = 1,
    circle = 2,
    star1 = 3,
    hash = 4,
    leaf = 5,
    star2 = 6
}

export interface TileSymbols {
    id?: number;
    color?: ColorEnum;
    symbol?: SymbolEnum;
}

export interface TileData extends TileSymbols {
    x: number;
    y: number;
    allowDrag?: boolean;
}

export interface BoardData {
    tiles: TileData[];
    sizeX: number;
    sizeY: number;
    activePlayer: string;
}

export const color1 = "warning";
export const color2 = "success";