import { ColorEnum, SymbolEnum, TileData } from '../../src/types';
import { createDefaultField } from './createDefaultField';

export const tilesOnBoard = [

    {
        position: {
            x: 2,
            y: 1,
        },
        symbol: {
            symbol: SymbolEnum.hash,
            color: ColorEnum.orange
        }
    },
    {
        position: {
            x: 3,
            y: 1,
        },
        symbol: {
            symbol: SymbolEnum.hash,
            color: ColorEnum.green
        }
    },
    {
        position: {
            x: 4,
            y: 1,
        },
        symbol: {
            symbol: SymbolEnum.hash,
            color: ColorEnum.blue
        }
    },
    {
        position: {
            x: 5,
            y: 1,
        },
        symbol: {
            symbol: SymbolEnum.hash,
            color: ColorEnum.purple
        }
    },

    {
        position: {
            x: 7,
            y: 1,
        },
        symbol: {
            symbol: SymbolEnum.hash,
            color: ColorEnum.orange
        }
    },

    {
        position: {
            x: 1,
            y: 2,
        },
        symbol: {
            symbol: SymbolEnum.star1,
            color: ColorEnum.orange
        }
    },
    {
        position: {
            x: 2,
            y: 2,
        },
        symbol: {
            symbol: SymbolEnum.square,
            color: ColorEnum.orange
        }
    },

    {
        position: {
            x: 2,
            y: 3,
        },
        symbol: {
            symbol: SymbolEnum.circle,
            color: ColorEnum.orange
        }
    },
    {
        position: {
            x: 4,
            y: 3,
        },
        symbol: {
            symbol: SymbolEnum.circle,
            color: ColorEnum.blue
        }
    },

    {
        position: {
            x: 2,
            y: 4,
        },
        symbol: {
            symbol: SymbolEnum.leaf,
            color: ColorEnum.orange
        }
    },
    {
        position: {
            x: 3,
            y: 4,
        },
        symbol: {
            symbol: SymbolEnum.leaf,
            color: ColorEnum.purple
        }
    },
    {
        position: {
            x: 4,
            y: 4,
        },
        symbol: {
            symbol: SymbolEnum.leaf,
            color: ColorEnum.blue
        }
    },
    {
        position: {
            x: 5,
            y: 4,
        },
        symbol: {
            symbol: SymbolEnum.leaf,
            color: ColorEnum.red
        }
    },
];

const data3: TileData[] = createDefaultField(9, tilesOnBoard);
export { data3 };