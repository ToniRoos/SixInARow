import { checkMoveForAlreadyPlayedTilesOfTurn } from "./checkMoveForAlreadyPlayedTilesOfTurn";
import { TileData, TilePosition } from "../../../types";
import { GameState } from "../../game";
import { checkIfTileFitsByCheckingNeighbours } from "./checkIfTileFitsByCheckingNeighbours";

const checkMove = (gameState: GameState, id: string, tileToMove: TileData): boolean => {

    const board = gameState.board!;
    const tileOnBoard = board.getTileForCoordinates(tileToMove);
    const tilesOnBoard = board.getBoardData().tiles;

    const tileMatches = checkIfTileFitsByCheckingNeighbours(tileOnBoard.position, tileToMove.symbol?.color, tileToMove.symbol?.symbol, tilesOnBoard);
    if (!tileMatches) {
        return false;
    }

    let sessionData = gameState.userStore.getSession(id);
    let tilesOnTurn = sessionData ? sessionData.tilesOnTurn : [];

    const tilesOnTurnPosition: TilePosition[] = tilesOnTurn.map(tile => ({ ...tile.position }));
    const allowMove = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurnPosition, tileOnBoard.position);

    return allowMove;
}

export { checkMove };