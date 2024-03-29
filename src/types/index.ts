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
    color: ColorEnum;
    symbol: SymbolEnum;
}

export interface TilePosition {
    x: number;
    y: number;
}

export interface TileData {
    position: TilePosition;
    symbol?: TileSymbols;
}

export interface BoardData {
    tiles: TileData[];
    sizeX: number;
    sizeY: number;
}

export const color1 = "warning";
export const color2 = "success";