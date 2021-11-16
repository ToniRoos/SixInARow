import { unknownPlayerError } from "../createError";
import { GameState } from "../game2";
import { UserSessionData } from "../userStore/UserSessionData";

const nextTurn = (gameState: GameState, id: string) => {
    const sessionData = gameState.userStore.getSession(id);

    if (!sessionData) {
        throw unknownPlayerError();
    }

    const tiles = gameState.stock!.getNextTiles(sessionData.tilesOnTurn.length);
    sessionData.tilesOnTurn = [];

    sessionData.tilesOnHand = [...sessionData.tilesOnHand, ...tiles];

    let nextPlayer: UserSessionData = gameState.userStore.getNextPlayer(id);
    gameState.activePlayerId = nextPlayer.id;
    gameState.activePlayerName = nextPlayer.name;
}

export { nextTurn };