import { GameState, GameStatus as PlayerStatus } from "../game2";

const getGameStatus = (gameState: GameState, id?: string): PlayerStatus => {
    const players = gameState.userStore.getUserSessions().map(userData => userData.name);
    const userSession = gameState.userStore.getSession(id);

    return {
        players,
        state: gameState.state,
        activeTurn: gameState.activePlayerId === id,
        board: gameState.board?.getBoardData(),
        tilesOnHand: userSession ? userSession.tilesOnHand : [],
        activePlayer: gameState.activePlayerName
    };
};

export { getGameStatus };