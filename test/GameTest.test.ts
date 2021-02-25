import { game } from "../src/logic/stock";
import { ColorEnum, SymbolEnum } from "../src/types";

describe('Board game logic', () => {

  it('create inital board', () => {

    const boardData = game.createGame();
    expect(boardData).toMatchSnapshot();
  });

  it('add player', () => {

    const ws: any = {};

    game.addUserSession({
      name: "Player 1",
      id: "12345678",
      tilesOnHand: [],
      tilesOnTurn: [],
      ws: ws
    })

    expect(game.countUsers()).toBe(1);
  });

  it('move tile', () => {

    game.executeMove({ x: 1, y: 1, color: ColorEnum.blue, symbol: SymbolEnum.circle });

    expect(game.getGameData()).toMatchSnapshot();
  });
});