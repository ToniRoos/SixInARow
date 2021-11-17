import { checkMoveForAlreadyPlayedTilesOfTurn } from "./checkMoveForAlreadyPlayedTilesOfTurn";
import { TileData, TilePosition } from "../../types";
import { GameState } from "../game";
import { findMatchingTilesByCheckingNeighbours } from "../board/findMatchingTilesByCheckingNeighbours";

const checkMove = (gameState: GameState, id: string, tileToMove: TileData): boolean => {

    const board = gameState.board!;
    const tileOnBoard = board.getTileForCoordinates(tileToMove);
    const tilesAtBoard = board.getBoardData().tiles;

    const tileMatches = findMatchingTilesByCheckingNeighbours(tileOnBoard.position, tileToMove.symbol?.color, tileToMove.symbol?.symbol, tilesAtBoard);
    if (!tileMatches) {
        return false;
    }

    let sessionData = gameState.userStore.getSession(id);
    let tilesOnTurn = sessionData ? sessionData.tilesOnTurn : [];

    const tilesOnTurnPosition: TilePosition[] = tilesOnTurn.map(tile => ({ ...tile.position }));
    const allowMove = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnTurnPosition, tileOnBoard.position);

    // if (allowMove && tilesOnTurn.length === 0) {
    //     // const allowMoveForRow = tilesAtBoard.filter(tile => tile.x = tileToMove.x && Math.abs(tile.y - tileToMove.y) === 1)
    // }
    return allowMove;
}

export { checkMove };