import { TileSymbols } from "../Tile";

export const stock = (function () {
    var stock: TileSymbols[] = [];

    // (() => {
    //     stock = createInitalStock();
    // })();

    return { // public interface
        getNextTiles: function (number: number) {
            var max = stock.length - 1;
            var min = 0;

            var tiles = [];
            for (let i = 0; i < number; i++) {

                var tileIndex = Math.floor(Math.random() * (max - min)) + min;
                var tile = stock.splice(tileIndex, 1)[0];
                tiles.push(tile);
            }

            tiles.forEach((element, index) => {
                element.id = index;
            });
            return tiles;
        },
        createInitalStock: () => {

            const amountOfColors = 6;
            const amountOfShapes = 6;
            const amountOfSetsPerColor = 3;

            const stock: TileSymbols[] = [];
            for (let m = 0; m < amountOfSetsPerColor; m++) {
                for (let color = 1; color < amountOfColors + 1; color++) {
                    for (let shape = 1; shape < amountOfShapes + 1; shape++) {
                        stock.push({ color: color, symbol: shape })
                    }
                }
            }
            return stock;
        }
    };
})();