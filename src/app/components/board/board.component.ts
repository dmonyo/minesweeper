import { Component, OnInit } from '@angular/core';
import {Cell} from '../../models/cell'

//Game level constant definitions
const BEGINNER:number = 9 
const  EXPERT:number = 16

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private board: Cell[][]
  private _level:number
  private _current: Cell
  private _adyacents:number[] = [-1, 0, 1]

  constructor() { 
    //Initialize properties
    this.board = [[]]
    this._level = BEGINNER
    this._current = {
      row:-1,
      col:1,
      isBomb:false,
      isFlagged:false,
      countAround:0,
      isRevealed:false,
      cellgliph: ''
    }

    //Bind functions to this component     
    this.setCurrent.bind(this)
    // this.revealCell.bind(this)   
    // this.checkAdyacents.bind(this) 
  }

  ngOnInit() {
    this.paintBoard(BEGINNER)
  }

  private paintBoard(level: number){
    this.board = [[]]
    for (let x = 0; x < level; x++) {
      this.board.push([])
      for (let y = 0; y < level; y++){
        let cell = new Cell()        
        cell.row = x,
        cell.col = y,
        cell.isBomb = false,
        cell.isFlagged = false,
        cell.countAround = 0,
        cell.isRevealed = false,
        cell.cellgliph =  ''
        
        this.board[x].push(cell)
      }
    }
    //this.plantMines()    
  }


  setCurrent = (currentCell: Cell)=>{
    this._current = currentCell
    //this.revealCell(this._current, false)
  }

}
