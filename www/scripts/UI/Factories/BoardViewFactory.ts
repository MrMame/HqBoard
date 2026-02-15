import { BoardView } from "../ModelViews/BoardView.js";
import { TileView } from "../ModelViews/TileView.js";
import { TileViewFactory } from "./TileViewFactory.js";

export class BoardViewFactory{

    public static createBoardView():BoardView{
        // Tiles Initialize
        const tiles: TileView[][] = [];
        for (let x = 0; x < BoardView.BOARD_SQUARE_WIDTH; x++) {
            tiles[x] = [];
            for (let y = 0; y < BoardView.BOARD_SQUARE_HEIGHT; y++) {
                tiles[x][y] = new TileView(x,y);
            }
        }
        return new BoardView(tiles);
    }

}