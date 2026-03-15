import { Board } from "../../Domain/Models/Board.js";
import { BoardView } from "../ModelViews/BoardView.js";

export class BoardViewFactory{

    public static createBoardView():BoardView{
        let board = new Board();
        return new BoardView(board);
    }
    public static createBoardViewFromBoard(board: Board):BoardView{
        return new BoardView(board);
    }

}