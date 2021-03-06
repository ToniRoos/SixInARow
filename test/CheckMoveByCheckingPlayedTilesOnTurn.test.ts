import { checkMoveForAlreadyPlayedTilesOfTurn } from "../src/logic/boardLogic";
import { ColorEnum, SymbolEnum, TileData } from "../src/types";

describe('Game logic check move by checking played tiles on turn', () => {

  beforeAll(() => {

    let legend = "Legend:";
    for (var i = 0; i < 6; i++) {

      legend += `\n${i + 1}\t${ColorEnum[i + 1]}\t${SymbolEnum[i + 1]}`;
    }
    console.log(legend);
  })

  it('allow move for none played tile before', () => {

    const tileToPlay: TileData = { x: 6, y: 2 };
    const canDrop = checkMoveForAlreadyPlayedTilesOfTurn([], tileToPlay);

    expect(canDrop).toBeTruthy();
  });

  it('allow move for one played tile directly in column', () => {

    const tileToPlay: TileData = { x: 6, y: 2 };
    const tilesOnTurn: TileData[] = [
      { x: 5, y: 2 }
    ]
    const canDrop = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnTurn, tileToPlay);

    expect(canDrop).toBeTruthy();
  });

  it('allow move for one played tile directly in row', () => {

    const tileToPlay: TileData = { x: 6, y: 2 };
    const tilesOnTurn: TileData[] = [
      { x: 6, y: 1 }
    ]
    const canDrop = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnTurn, tileToPlay);

    expect(canDrop).toBeTruthy();
  });

  it('allow move for five played tiles directly in column', () => {

    const tileToPlay: TileData = { x: 6, y: 2 };
    const tilesOnTurn: TileData[] = [
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
    ]
    const canDrop = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnTurn, tileToPlay);

    expect(canDrop).toBeTruthy();
  });

  it('allow move for five played tiles directly in column splitted', () => {

    const tileToPlay: TileData = { x: 6, y: 2 };
    const tilesOnTurn: TileData[] = [
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
      { x: 7, y: 2 }
    ]
    const canDrop = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnTurn, tileToPlay);

    expect(canDrop).toBeTruthy();
  });

  it('forbid move for four played tiles with a gap in column', () => {

    const tileToPlay: TileData = { x: 6, y: 2 };
    const tilesOnTurn: TileData[] = [
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 }
    ]
    const canDrop = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnTurn, tileToPlay);

    expect(canDrop).toBeFalsy();
  });
});