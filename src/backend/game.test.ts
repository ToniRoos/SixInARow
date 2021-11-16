
import { game } from "./game";
import { TileSymbols } from "../types";

describe('Board game', () => {

  it('create board', () => {

    const gameInstance = game();
    const player1 = gameInstance.addPlayer('Player 1');
    const player2 = gameInstance.addPlayer('Player 2');

    // ACT
    gameInstance.startGame(player1);
    const gameStatus = gameInstance.getGameStatus();

    expect(gameStatus.board).toMatchSnapshot();
  });

  it('add player', () => {

    const gameInstance = game();
    const player1 = gameInstance.addPlayer('Player 1');

    // ACT
    const gameStatus = gameInstance.getGameStatus();

    expect(gameStatus.players[0]).toBe('Player 1');
  });

  it('add 4 players', () => {

    const gameInstance = game();
    gameInstance.addPlayer('Player 1');
    gameInstance.addPlayer('Player 2');
    gameInstance.addPlayer('Player 3');
    gameInstance.addPlayer('Player 4');

    // ACT
    const gameStatus = gameInstance.getGameStatus();

    expect(gameStatus.players.length).toBe(4);
  });

  it('active player should be player 4', () => {

    const gameInstance = game();
    gameInstance.addPlayer('Player 1');
    gameInstance.addPlayer('Player 2');
    gameInstance.addPlayer('Player 3');
    const playerId = gameInstance.addPlayer('Player 4');

    // ACT
    gameInstance.startGame(playerId);
    const gameStatus = gameInstance.getGameStatus(playerId);

    expect(gameStatus.activeTurn).toBeTruthy();
  });

  it('active player should be player 4', () => {

    const gameInstance = game();
    gameInstance.addPlayer('Player 1');
    gameInstance.addPlayer('Player 2');
    gameInstance.addPlayer('Player 3');
    const playerId = gameInstance.addPlayer('Player 4');

    // ACT
    gameInstance.startGame(playerId);
    const gameStatus = gameInstance.getGameStatus(playerId);

    expect(gameStatus.activeTurn).toBeTruthy();
  });

  it('all 4 players have initial tiles on hand', () => {

    const gameInstance = game();
    const playerId1 = gameInstance.addPlayer('Player 1');
    const playerId2 = gameInstance.addPlayer('Player 2');
    const playerId3 = gameInstance.addPlayer('Player 3');
    const playerId4 = gameInstance.addPlayer('Player 4');

    // ACT
    gameInstance.startGame(playerId4);
    const gameStatusForPlayer1 = gameInstance.getGameStatus(playerId1);
    const gameStatusForPlayer2 = gameInstance.getGameStatus(playerId2);
    const gameStatusForPlayer3 = gameInstance.getGameStatus(playerId3);
    const gameStatusForPlayer4 = gameInstance.getGameStatus(playerId4);

    expect(gameStatusForPlayer1.tilesOnHand.length).toBe(6);
    expect(gameStatusForPlayer2.tilesOnHand.length).toBe(6);
    expect(gameStatusForPlayer3.tilesOnHand.length).toBe(6);
    expect(gameStatusForPlayer4.tilesOnHand.length).toBe(6);
  });

  it('player 1 plays one tile', () => {

    const gameInstance = game();
    const playerId1 = gameInstance.addPlayer('Player 1');
    const playerId2 = gameInstance.addPlayer('Player 2');

    gameInstance.startGame(playerId1);
    const gameStatusForPlayer1 = gameInstance.getGameStatus(playerId1);
    const firstTileToPlay: TileSymbols = gameStatusForPlayer1.tilesOnHand[0];

    // ACT
    gameInstance.checkMove(playerId1, { position: { x: 1, y: 1 }, symbol: firstTileToPlay });
    const gameStatusAfterPlayedTile = gameInstance.getGameStatus(playerId1);

    const boardTile_X1_Y1 = gameStatusAfterPlayedTile.board!.tiles.find(tile => tile.position.x === 1 && tile.position.y === 1);
    expect(boardTile_X1_Y1!.symbol!.color).toBe(firstTileToPlay.color);
    expect(boardTile_X1_Y1!.symbol!.symbol).toBe(firstTileToPlay.symbol);
  });
});