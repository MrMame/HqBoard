import { Tile } from "../../Domain/Models/Tile.js";
import { TileView } from "../ModelViews/TileView.js";
import { Board } from "../../Domain/Models/Board.js";


export class TileViewFactory{
    public static createTileView(x:number,y:number):TileView{
        let newTile = new Tile(x,y);
        return this.createTileViewFromTile(newTile);
    }
    public static createTileViewFromTile(tile:Tile):TileView{
        return new TileView(tile);
    }
    public static createTileViewsFromBoard(board:Board):TileView[][]{
        let tileViews:TileView[][] = [];
        for (let row = 0; row < (board.BOARD_TILES_ROWS); row++) {
            tileViews[row] = [];
            for (let col = 0; col < (board.BOARD_TILES_COLUMNS); col++) {
                let tile = board.getTileAt(col, row);
                if (tile) {
                    tileViews[row][col] = TileViewFactory.createTileViewFromTile(tile);
                }else{
                    throw new Error(`Tile at position ${col}, ${row} not found on board.`);
                }
            }
        }
        return tileViews;
    }




}