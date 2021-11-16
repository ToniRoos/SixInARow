
import { printBoardToConsole } from "../app/Board/printBoardToConsole";
import { ColorEnum, SymbolEnum, TilePosition, TileData } from "../types";
import { findMatchingTilesByCheckingNeighbours } from "./boardLogic";
import { data1 } from "./testData/boardTestData1";
import { data2 } from "./testData/boardTestData2";
import { data3 } from "./testData/boardTestData3";
import { data4 } from "./testData/boardTestData4";

describe('Game logic check move by matching neighbours', () => {

  const debug: boolean = false;
  beforeAll(() => {

    let legend = "Legend:";
    for (var i = 0; i < 6; i++) {

      legend += `\n${i + 1}\t${ColorEnum[i + 1]}\t${SymbolEnum[i + 1]}`;
    }
    console.log(legend);
  })

  it('lock turn for column check cause of symbol and color missmatch', () => {

    const tileToSearch: TilePosition = { x: 3, y: 3 };
    const color = ColorEnum.red;
    const symbol = SymbolEnum.circle;
    const tiles: TileData[] = data1;
    const allowMove = findMatchingTilesByCheckingNeighbours(tileToSearch, color, symbol, tiles);

    expect(allowMove).toBeFalsy();
  });

  it('lock turn for column check cause of symbol missmatch', () => {

    const tileToSearch: TilePosition = { x: 3, y: 2 };
    const color = ColorEnum.orange;
    const symbol = SymbolEnum.circle;
    const tiles: TileData[] = data2;

    const allowMove = findMatchingTilesByCheckingNeighbours(tileToSearch, color, symbol, tiles);

    expect(allowMove).toBeFalsy();
  });

  it('lock turn for column check cause of symbol missmatch 2', () => {

    const tileToSearch: TilePosition = { x: 4, y: 2 };
    const color = ColorEnum.blue;
    const symbol = SymbolEnum.leaf;
    const tiles: TileData[] = data2;
    const allowMove = findMatchingTilesByCheckingNeighbours(tileToSearch, color, symbol, tiles);

    expect(allowMove).toBeFalsy();
  });

  it('lock turn for column check cause of color missmatch 2', () => {

    const tileToSearch: TilePosition = { x: 4, y: 2 };
    const color = ColorEnum.red;
    const symbol = SymbolEnum.square;
    const tiles: TileData[] = data2;
    const allowMove = findMatchingTilesByCheckingNeighbours(tileToSearch, color, symbol, tiles);

    expect(allowMove).toBeFalsy();
  });

  it('lock turn for row check cause of duplicate color missmatch', () => {

    const tileToSearch: TilePosition = { x: 6, y: 1 };
    const color = ColorEnum.yellow;
    const symbol = SymbolEnum.hash;
    const tiles: TileData[] = data3;
    const allowMove = findMatchingTilesByCheckingNeighbours(tileToSearch, color, symbol, tiles);

    expect(allowMove).toBeFalsy();
  });

  it('lock turn for row check cause of too many tiles', () => {

    const tileToSearch: TilePosition = { x: 6, y: 1 };
    const color = ColorEnum.yellow;
    const symbol = SymbolEnum.hash;
    const tiles: TileData[] = data4;
    const allowMove = findMatchingTilesByCheckingNeighbours(tileToSearch, color, symbol, tiles);

    expect(allowMove).toBeFalsy();
  });

  it('allow turn for column match', () => {

    const tileToSearch: TilePosition = { x: 4, y: 2 };
    const color = ColorEnum.blue;
    const symbol = SymbolEnum.square;
    const tiles: TileData[] = data2;
    const allowMove = findMatchingTilesByCheckingNeighbours(tileToSearch, color, symbol, tiles);

    expect(allowMove).toBeTruthy();
  });

  it('allow turn for column match 2', () => {

    const tileToSearch: TilePosition = { x: 4, y: 2 };
    const color = ColorEnum.blue;
    const symbol = SymbolEnum.star1;
    const tiles: TileData[] = data2;
    const allowMove = findMatchingTilesByCheckingNeighbours(tileToSearch, color, symbol, tiles);

    expect(allowMove).toBeTruthy();
  });

  it('allow turn for column and row match', () => {

    const tileToSearch: TilePosition = { x: 3, y: 2 };
    const color = ColorEnum.orange;
    const symbol = SymbolEnum.hash;
    const tiles: TileData[] = data2;
    printBoardToConsole(data2);
    const allowMove = findMatchingTilesByCheckingNeighbours(tileToSearch, color, symbol, tiles);

    expect(allowMove).toBeTruthy();
  });
});