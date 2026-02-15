import { TileView } from "../ModelViews/TileView";

export class TileViewFactory{
    public static createTileView(x:number,y:number):TileView{
        return new TileView(x,y);
    }
}