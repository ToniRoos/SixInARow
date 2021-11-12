import { SessionId, TileData, TileSymbols } from "../../types";
import * as WebSocket from "ws";

export interface UserSessionData extends SessionId {
    name: string;
    ws?: WebSocket;
    tilesOnHand: TileSymbols[];
    tilesOnTurn: TileData[];
}