import { board } from "../board/board";
import { unknownPlayerError } from "../createError";
import { GameRunningState, GameState } from "../game2";
import { createStock } from "../tileStock/createStock";
import { stockConfig } from "../tileStock/stockConfig";
import { UserSessionData } from "../userStore/UserSessionData";

const startGame = (gameState: GameState, id: string) => {

    const userSession = gameState.userStore.getSession(id);
    if (!userSession) {
        throw unknownPlayerError();
    }

    gameState.stock = createStock();
    gameState.board = board();
    gameState.state = GameRunningState.started;

    const userSessionList: UserSessionData[] = gameState.userStore.getUserSessions();
    userSessionList.forEach(userSession => {

        const initalTilesOnHand = gameState.stock!.getNextTiles(stockConfig.amountOfTiles);
        userSession.tilesOnHand = initalTilesOnHand;
    });

    gameState.activePlayerId = userSession.id;
    gameState.activePlayerName = userSession.name;
};

export { startGame };