import * as WebSocket from "ws";
import { game } from "../logic/stock";
import { Command, SessionId, TileData, TileSymbols } from "../types";
import { createUUID } from "./helper";

const wss = new WebSocket.Server({ port: 8080 });

export interface UserSessionData extends SessionId {
    name: string;
    ws: WebSocket;
    tilesOnHand: TileSymbols[];
    tilesOnTurn: TileData[];
    // turnActive: boolean;
}

wss.on('connection', function connection(ws: WebSocket) {

    let id: string;
    // let tilesOnTurn: TileData[] = [];

    try {
        ws.on('message', (message: string) => {

            const dataParsed: Command = JSON.parse(message);

            if (id && id !== dataParsed.id) {
                console.log("Returned with invalid ID. " + id + " !== " + dataParsed.id)
                return;
            }

            switch (dataParsed.command) {
                case 'SetName':
                    id = createUUID();
                    game.addUserSession({
                        id: id,
                        name: dataParsed.data,
                        ws: ws,
                        tilesOnHand: [],
                        tilesOnTurn: []
                    });
                    sendCommand(ws, { command: 'SetId', id: id });
                    console.log(`added id for user: ${dataParsed.data}, id: ${id}`);
                    break;
                case 'GetPlayers':

                    const data = game.getUserNames();
                    setDataToAllClients({ command: 'PlayersList', data: data });
                    console.log(`playerslist: ${JSON.stringify(data)}`);

                    break;
                case 'StartGame':

                    const initalBoard = game.createGame();
                    const countUsers = game.countUsers();
                    const startTilesForAllPlayers = game.getNextTiles(6 * countUsers);

                    game.getUserSessions().forEach((item, index) => {

                        if (index === 0) {
                            // item.turnActive = true;
                            game.setActivePlayer(item.name);
                        }

                        const tilesOnHand = startTilesForAllPlayers.splice(0, 6);
                        setIdsToTilesOnHand(tilesOnHand);
                        item.tilesOnHand = tilesOnHand;

                        sendCommand(item.ws, {
                            command: 'StartGame', data: {
                                turnActive: item.name === game.getGameData().activePlayer,
                                tilesOnHand: tilesOnHand,
                                board: initalBoard
                            }
                        });
                    });
                    console.log(`start game`);

                    break;
                case 'GetTiles':

                    // const tiles = game.getNextTiles(6);
                    // sendCommand(ws, { command: 'GetTiles', id: id, data: tiles });
                    console.log(`get tiles`);

                    break;
                case 'CheckMove':

                    console.log(`check move`);

                    if (game.getSession(id).name !== game.getGameData().activePlayer) {
                        return;
                    }

                    const tileToMove: TileData = dataParsed.data;
                    const canExecuteMove = game.checkMove(id, tileToMove);
                    if (!canExecuteMove) {
                        return;
                    }

                    ///////////
                    let gameData = game.executeMove(tileToMove);

                    game.getUserSessions().forEach(item => {

                        let tilesOnHand = item.tilesOnHand;
                        if (id === item.id) {

                            tilesOnHand = tilesOnHand.filter(tile => tile.id !== tileToMove.id);
                        }

                        item.tilesOnHand = tilesOnHand;
                        sendCommand(item.ws, {
                            command: 'RefreshBoard', data: {
                                turnActive: item.name === game.getGameData().activePlayer,
                                tilesOnHand: tilesOnHand,
                                board: gameData
                            }
                        });
                    });

                    break;
                case 'NextTurn':

                    const sessionData = game.getSession(id);
                    let tilesOnTurn = sessionData.tilesOnTurn;

                    const tiles = game.getNextTiles(tilesOnTurn.length);
                    sessionData.tilesOnTurn = [];

                    const session = game.getSession(id);

                    session.tilesOnHand = [...session.tilesOnHand, ...tiles];
                    setIdsToTilesOnHand(session.tilesOnHand);

                    const activePlayer = setNextPlayerActive(session.id);
                    game.setActivePlayer(activePlayer);

                    game.getUserSessions().forEach((item, index) => {
                        sendCommand(item.ws, {
                            command: 'RefreshBoard', data: {
                                turnActive: item.name === activePlayer,
                                tilesOnHand: item.tilesOnHand,
                                board: game.getGameData()
                            }
                        });
                    });

                    console.log(`next turn`);

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

function setIdsToTilesOnHand(tilesOnHand: TileSymbols[]) {
    tilesOnHand.forEach((tile, i) => {
        tile.id = i;
    });
}

function removeSession(id: string) {
    console.log('close session: ', id);
    const index = game.getUserSessions().findIndex(item => item.id === id);
    if (index >= 0) {
        game.getUserSessions().splice(index, 1);
        console.log('removed id: %s', id);
    }
}

function setNextPlayerActive(id?: string) {

    console.log('set next player active: ', id);
    let activePlayer = '';

    // userStore.forEach(sessionItem => {
    //     sessionItem.turnActive = false;
    // });

    const sessionIndex = game.getUserSessions().findIndex(item => item.id === id);
    if (sessionIndex < game.getUserSessions().length - 1) {
        // userStore[sessionIndex + 1].turnActive = true;
        activePlayer = game.getUserSessions()[sessionIndex + 1].name;
    } else {
        // userStore[0].turnActive = true;
        activePlayer = game.getUserSessions()[0].name;
    }

    return activePlayer;
}

const setDataToAllClients = (command: Command) => {
    game.getUserSessions().forEach(item => {
        if (item.ws.readyState === item.ws.OPEN) {
            sendCommand(item.ws, command);
        } else {
            if (item.id) {
                removeSession(item.id);
            }
        }
    });
}

