import * as WebSocket from "ws";
import { findMatchingTilesByCheckingNeighbours } from "../logic/boardLogic";
import { stock } from "../logic/stock";
import { Command, SessionId, TileData, TileSymbols } from "../types";
import { createUUID } from "./helper";

const wss = new WebSocket.Server({ port: 8080 });
const userStore: UserSessionData[] = [];
export interface UserSessionData extends SessionId {
    name: string;
    ws: WebSocket;
    tilesOnHand: TileSymbols[];
    turnActive: boolean;
}

wss.on('connection', function connection(ws: WebSocket) {

    let id: string;
    let tilesOnTurn: TileData[] = [];

    try {
        ws.on('message', (message: string) => {

            const dataParsed: Command = JSON.parse(message);
            switch (dataParsed.command) {
                case 'SetName':
                    id = createUUID();
                    userStore.push({
                        id: id,
                        name: dataParsed.data,
                        ws: ws,
                        tilesOnHand: [],
                        turnActive: false
                    })
                    sendCommand(ws, { command: 'SetId', id: id });
                    console.log(`added id for user: ${dataParsed.data}, id: ${id}`);
                    break;
                case 'GetPlayers':

                    const data = userStore.map(items => items.name);
                    setDataToAllClients({ command: 'PlayersList', data: data });
                    console.log(`playerslist: ${JSON.stringify(data)}`);

                    break;
                case 'StartGame':

                    const initalBoard = stock.createGame();
                    const startTilesForAllPlayers = stock.getNextTiles(6 * userStore.length);
                    let activePlayer = "";

                    userStore.forEach((item, index) => {

                        if (index === 0) {
                            item.turnActive = true;
                            activePlayer = item.name;
                        }

                        const tilesOnHand = startTilesForAllPlayers.splice(0, 6);
                        tilesOnHand.forEach((tile, i) => {
                            tile.id = i;
                        });
                        item.tilesOnHand = tilesOnHand;

                        sendCommand(item.ws, {
                            command: 'StartGame', data: {
                                turnActive: item.turnActive,
                                tilesOnHand: tilesOnHand,
                                activePlayer: activePlayer,
                                board: initalBoard
                            }
                        });
                    });
                    console.log(`start game`);

                    break;
                case 'GetTiles':

                    // const tiles = stock.getNextTiles(6);
                    // sendCommand(ws, { command: 'GetTiles', id: id, data: tiles });
                    console.log(`get tiles`);

                    break;
                case 'CheckMove':

                    console.log(`check move`);

                    if (!getSession(id).turnActive) {
                        return;
                    }

                    const tileToMove: TileData = dataParsed.data;
                    const tileOnBoard = stock.getTileForCoordinates(tileToMove);

                    const tileMatches = findMatchingTilesByCheckingNeighbours(tileOnBoard, tileToMove.color, tileToMove.symbol, stock.getTilesOfGame());
                    if (!tileMatches) {
                        return;
                    }

                    const tilesOnTurnSize = tilesOnTurn.length;
                    if (tilesOnTurnSize === 1
                        && tileOnBoard.x !== tilesOnTurn[0].x
                        && tileOnBoard.y !== tilesOnTurn[0].y) {
                        return;
                    }

                    const numberInRow = tilesOnTurn.filter(item => item.x === tileOnBoard.x).length;
                    const numberInCol = tilesOnTurn.filter(item => item.y === tileOnBoard.y).length;
                    if (tilesOnTurnSize > 1
                        && numberInRow !== tilesOnTurnSize
                        && numberInCol !== tilesOnTurnSize) {

                        return;
                    }

                    tilesOnTurn.push(tileOnBoard);

                    const gameData = stock.executeMove(tileOnBoard, tileToMove);

                    userStore.forEach(item => {

                        let tilesOnHand = item.tilesOnHand;
                        if (id === item.id) {

                            tilesOnHand = tilesOnHand.filter(tile => tile.id !== tileToMove.id);
                        }

                        item.tilesOnHand = tilesOnHand;
                        sendCommand(item.ws, { command: 'RefreshBoard', data: { tilesOnHand: tilesOnHand, board: gameData } });
                    });

                    break;
                default:
                    break;
            }
        });

        ws.on('close', () => {
            removeSession(id);
        });

    } catch (e) {
        console.error(e)
    }

});

const sendCommand = (ws: WebSocket, command: Command) => {

    const parsedPayload = JSON.stringify(command);

    ws.send(parsedPayload);
}

function removeSession(id: string) {
    console.log('close session: ', id);
    const index = userStore.findIndex(item => item.id === id);
    if (index >= 0) {
        userStore.splice(index, 1);
        console.log('removed id: %s', id);
    }
}

function getSession(id?: string) {
    console.log('get session: ', id);
    const session = userStore.filter(item => item.id === id)[0];
    return session;
}

const setDataToAllClients = (command: Command) => {
    userStore.forEach(item => {
        if (item.ws.readyState === item.ws.OPEN) {
            sendCommand(item.ws, command);
        } else {
            if (item.id) {
                removeSession(item.id);
            }
        }
    });
}

