import { Tile } from "../../Domain/Models/Tile.js";
import { TileView } from "../ModelViews/TileView.js";

export class TileViewFactory{
    public static createTileView(x:number,y:number):TileView{
        let newTile = new Tile(x,y);
        return this.createTileViewFromTile(newTile);
    }
    public static createTileViewFromTile(tile:Tile):TileView{
        return new TileView(tile);
    }
    public static createTileViewsFromTiles(tiles:Tile[][]):TileView[][]{
        let tileViews:TileView[][] = [];
        for (let y = 0; y < tiles.length; y++) {
            tileViews[y] = [];
            for (let x = 0; x < tiles[y].length; x++) {
                tileViews[y][x] = TileViewFactory.createTileViewFromTile(tiles[y][x]);
            }
        }
        return tileViews;
    }

}