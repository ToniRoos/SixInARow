import { printBoardToConsole } from "../../../app/Board/printBoardToConsole";
import { ColorEnum, SymbolEnum, TileData, TilePosition } from "../../../types";
import { createDefaultTestField } from "../../board/fixtures/createDefaultTestField";
import { createTestTile } from "../../board/fixtures/createTestTile";
import { checkMoveForAlreadyPlayedTilesOfTurn } from "./checkMoveForAlreadyPlayedTilesOfTurn";

describe('Game logic check move by checking played tiles on turn', () => {

  beforeAll(() => {

    let legend = "Legend:";
    for (var i = 0; i < 6; i++) {

      legend += `\n${i + 1}\t${ColorEnum[i + 1]}\t${SymbolEnum[i + 1]}`;
    }
    console.log(legend);
  })

  it('allow move for none played tile before', () => {

    const tileToPlay: TilePosition = { x: 6, y: 2 };
    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn([], [], tileToPlay);

    expect(moveAllowed).toBeTruthy();
  });

  it('allow move for 1 played tile in row', () => {

    const tileToPlay: TilePosition = { x: 6, y: 2 };
    const tilesOnTurn: TilePosition[] = [
      { x: 5, y: 2 }
    ];
    const tilesOnBoard: TileData[] = [
      createTestTile({ position: { x: 5, y: 2 } })
    ];
    printTestBoard(tilesOnBoard, tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeTruthy();
  });

  it('allow move for 1 played tile in column', () => {

    const tileToPlay: TilePosition = { x: 6, y: 2 };
    const tilesOnTurn: TilePosition[] = [
      { x: 6, y: 1 }
    ];
    const tilesOnBoard: TileData[] = [
      createTestTile({ position: { x: 6, y: 2 } })
    ];
    printTestBoard(tilesOnBoard, tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeTruthy();
  });

  it('allow move for 5 played tiles in row', () => {

    const tileToPlay: TilePosition = { x: 6, y: 2 };
    const tilesOnTurn: TilePosition[] = [
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
    ];
    const tilesOnBoard: TileData[] = [
      createTestTile({ position: { x: 1, y: 2 } }),
      createTestTile({ position: { x: 2, y: 2 } }),
      createTestTile({ position: { x: 3, y: 2 } }),
      createTestTile({ position: { x: 4, y: 2 } }),
      createTestTile({ position: { x: 5, y: 2 } }),
    ];
    printTestBoard(tilesOnBoard, tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeTruthy();
  });

  it('allow move for 2 played tiles in row reverse', () => {

    const tileToPlay: TilePosition = { x: 4, y: 2 };
    const tilesOnTurn: TilePosition[] = [
      { x: 5, y: 2 },
    ];
    const tilesOnBoard: TileData[] = [
      createTestTile({ position: { x: 5, y: 2 } })
    ];
    printTestBoard(tilesOnBoard, tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeTruthy();
  });

  it('allow filling gap for 5 played tiles in row', () => {

    const tileToPlay: TilePosition = { x: 6, y: 2 };
    const tilesOnTurn: TilePosition[] = [];

    const tilesOnBoard: TileData[] = [
      createTestTile({ position: { x: 5, y: 2 } }),
      createTestTile({ position: { x: 7, y: 2 } })
    ];
    printTestBoard(tilesOnBoard, tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeTruthy();
  });

  it('allow playing more tiles in row', () => {

    const tileToPlay: TilePosition = { x: 5, y: 2 };
    const tilesOnTurn: TilePosition[] = [
      { x: 3, y: 2 },
      { x: 4, y: 2 }
    ];

    const tilesOnBoard: TileData[] = [
      createTestTile({ position: { x: 2, y: 2 } })
    ];
    printTestBoard(tilesOnBoard, tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeTruthy();
  });

  it('forbid move for 4 played tiles with a gap to the played series in row', () => {

    const tileToPlay: TilePosition = { x: 6, y: 2 };
    const tilesOnTurn: TilePosition[] = [
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 }
    ]
    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn([], tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeFalsy();
  });

  it('forbid move for 1 played tile when column and row not matching', () => {

    const tileToPlay: TilePosition = { x: 2, y: 2 };
    const tilesOnTurn: TilePosition[] = [
      { x: 1, y: 1 }
    ]

    printTestBoard([], tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn([], tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeFalsy();
  });

  it('forbid move for 2 played tiles in column and column for next move does not match', () => {

    const tileToPlay: TilePosition = { x: 2, y: 2 };
    const tilesOnTurn: TilePosition[] = [
      { x: 1, y: 1 },
      { x: 1, y: 2 }
    ]
    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn([], tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeFalsy();
  });

  it('forbid move for 3 played tiles in column and column for next move does not match', () => {

    const tileToPlay: TilePosition = { x: 2, y: 3 };
    const tilesOnTurn: TilePosition[] = [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 }
    ]

    printTestBoard([], tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn([], tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeFalsy();
  });

  it('allow move with gap filled with already played tile', () => {

    const tileToPlay: TilePosition = { x: 5, y: 2 };
    const tilesOnTurn: TilePosition[] = [
      { x: 3, y: 2 }
    ];
    const tilesOnBoard: TileData[] = [
      createTestTile({ position: { x: 3, y: 3 } }),
      createTestTile({ position: { x: 3, y: 4 } }),
      createTestTile({ position: { x: 4, y: 3 } }),
      createTestTile({ position: { x: 4, y: 2 } }),
    ];

    printTestBoard(tilesOnBoard, tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeTruthy();
  });

  it('allow move with tile on board between played tilses', () => {

    const tileToPlay: TilePosition = { x: 2, y: 3 };
    const tilesOnTurn: TilePosition[] = [
      { x: 2, y: 1 }
    ];
    const tilesOnBoard: TileData[] = [
      createTestTile({ position: { x: 1, y: 1 } }),
      createTestTile({ position: { x: 1, y: 2 } }),
      createTestTile({ position: { x: 1, y: 3 } }),
      createTestTile({ position: { x: 2, y: 2 } }),
    ];

    printTestBoard(tilesOnBoard, tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeTruthy();
  });

  it('initial move must be in same series', () => {

    const tileToPlay: TilePosition = { x: 2, y: 2 };
    const tilesOnTurn: TilePosition[] = [
      { x: 2, y: 1 },
      { x: 3, y: 1 }
    ];
    const tilesOnBoard: TileData[] = [];

    printTestBoard(tilesOnBoard, tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeFalsy();
  });

  it('initial move must be in same series xxx', () => {

    const tileToPlay: TilePosition = { x: 5, y: 2 };
    const tilesOnTurn: TilePosition[] = [
      { x: 4, y: 2 },
    ];
    const tilesOnBoard: TileData[] = [
      createTestTile({ position: { x: 2, y: 1 } }),
      createTestTile({ position: { x: 3, y: 1 } }),
      createTestTile({ position: { x: 4, y: 1 } }),
    ];

    printTestBoard(tilesOnBoard, tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeFalsy();
  });

  it('initial move must be in same series xxxxxx', () => {

    const tileToPlay: TilePosition = { x: 0, y: 1 };
    const tilesOnTurn: TilePosition[] = [
      { x: 1, y: 1 },
    ];
    const tilesOnBoard: TileData[] = [
      createTestTile({ position: { x: 1, y: 1 } }),
      createTestTile({ position: { x: 2, y: 1 } }),
      createTestTile({ position: { x: 2, y: 2 } }),
    ];

    printTestBoard(tilesOnBoard, tilesOnTurn, tileToPlay);

    const moveAllowed = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnBoard, tilesOnTurn, tileToPlay);

    expect(moveAllowed).toBeTruthy();
  });
});

const printTestBoard = (
  tilesOnBoard: TileData[],
  tilesOnTurn: TilePosition[],
  tileToPlay: TilePosition
) => {
  const board = createDefaultTestField(9, tilesOnBoard);
  printBoardToConsole(board,
    [
      ...tilesOnTurn.map(tile => createTestTile({ position: tile })),
      createTestTile({ position: tileToPlay })
    ]
  );
}
