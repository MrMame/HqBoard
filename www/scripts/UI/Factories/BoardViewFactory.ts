import { Board } from "../../Domain/Models/Board.js";
import { BoardView } from "../ModelViews/BoardView.js";
import { TileView } from "../ModelViews/TileView.js";
import { TileViewFactory } from "./TileViewFactory.js";

export class BoardViewFactory{

    public static createBoardView():BoardView{
        // Tiles Initialize
        let board = new Board();
        return new BoardView(board);
    }
    public static createBoardViewFromBoard(board: Board):BoardView{
        // Tiles Initialize
        const tiles: TileView[][] = [];
        for (let x = 0; x < board.tiles[0].length; x++) {
            tiles[x] = [];
            for (let y = 0; y <  board.tiles.length; y++) {
                tiles[x][y] = TileViewFactory.createTileViewFromTile(board.tiles[x][y]);
            }
        }
        return new BoardView(board);
    }

}