import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Cell} from '../../models/cell'
import {Modal} from '../../models/modal'

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
  private _totalCellsNotRevealed: number
  private _totalBombs: number
  @Input() modal:Modal
  @Output() finalMessage:EventEmitter<string> =  new EventEmitter<string>()
  constructor() { 
    //Initialize properties
    this.board = [[]]
    this._level = BEGINNER
    this._totalCellsNotRevealed = 0
    this._totalBombs = 0
    this._current = {
      row:-1,
      col:1,
      isBomb:false,
      isFlagged:false,
      countAround:0,
      isRevealed:false,
      cellgliph: '',
      cellStyle: ''
    }

    //Bind conditiontions to this component     
    this.setCurrent.bind(this)
    this.revealCell.bind(this)   
    this.checkAdyacents.bind(this) 
    this.gameOver.bind(this)
    this.rePrintBoard.bind(this)
  }

  ngOnInit() {
    this.paintBoard(BEGINNER)
  }
  
  /**
   * Paint board according to game level
   * @param {number} level 
   */
  private paintBoard(level: number){
    this.board = []
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
    this.setTotalOfCells(level)
    this.plantMines()    
  }
  
  /**
   * Repaint Board when level change
   * @param event Event triggered
   */
  rePrintBoard = (value)=>{
    this._level = value
    this.paintBoard(this._level)
  }

  /**
   * Set current clicked Cell
   * @param {Cell} currentCell Clicked cell
   */
  setCurrent = (currentCell: Cell)=>{
    this._current = currentCell
    this.revealCell(this._current, false)
  }
  
  /**
   * Set totals of cells in 
   * @param level 
   */
  setTotalOfCells(level:number){
    this._totalCellsNotRevealed = level * level
  }

  /**
   * Reveal cell in board and the adyacents if necessary
   * @param {Cell} cell Clicked cell
   * @param {Boolean} recursive Cell revelation mode
   */
  private revealCell = (cell:Cell, recursive = false)=>{
    let scope = this    
    if(cell.isBomb){
      if(recursive){
        return
      }
      this.gameOver()
      return
    }  
    if(cell.isFlagged || (recursive && cell.isRevealed)){
      return
    }  
    
    cell.isRevealed = true
    cell.cellStyle = 'revealed'
    scope._totalCellsNotRevealed --
    cell.countAround = (this.checkAdyacents(cell, (cell)=>cell.isBomb == true)).length
    if(!cell.countAround){
      let neighbors = this.checkAdyacents(cell, (cell)=>cell.isBomb == false)
      neighbors.forEach((c)=>{
          scope.revealCell(c,true)    
      })
    }    
    //Check for win escenario
    if(scope.endedGame()){
      this.winGame()
      return
    }
      
  }

  /**
   * Check adyacents to Cell for a given condition
   * @argument {Cell} cell Current cell
   * @argument {function} condition Condition to check in cells
   * @returns {Array.<Cell>} Adyacent cells
   */
  checkAdyacents = (cell:Cell, condition)=>{
    let length = this._level;
    let result:Cell[] = []
    let board = this.board
    
    this._adyacents.forEach((x)=>{
      //checking range for row
      let row = cell.row + x
      if(row < 0 || row >= length){
        return;
      }
      
      this._adyacents.forEach((y)=>{
        //checking range for column
        let col = cell.col + y
        if(col < 0 || col >=length)
          return;
        //Check condition in selected cell
        if(condition(board[row][col]))
          result.push(board[row][col])
      })
    })
    
    return result;
  }
  
  /**
   * Plant mines randomly all over the board
   */
  private plantMines(){
    let  planted = 0
    this._totalBombs = 0
    switch (this._level){
      case (EXPERT):
      this._totalBombs = 40
        break;
      default:
      this._totalBombs = 10
        break
    }
    while(planted < this._totalBombs){
      let x = Math.floor((Math.random() * this._level) )
      let y = Math.floor((Math.random() * this._level))
      let cell = this.board[x][y]
      if(!cell.isBomb){
        cell.isBomb = true
        planted++
      }
    }    
  }
  
  /**
   * Check if the game is finished
   */
  private endedGame = ()=>{
    return this._totalBombs == this._totalCellsNotRevealed
  }

  private winGame = ()=>{    
    this.finalMessage.emit('win')
  }

  /**
   * Game over 
   */
  private gameOver = ()=>{
    this.board.forEach((arrays)=>{
      arrays.forEach((cell)=>{
        cell.isRevealed = true
        cell.cellStyle = 'revealed'
        if(cell.isBomb){
          cell.cellgliph = 'glyphicon glyphicon-asterisk'
          cell.cellStyle = 'boom'
        }
      })
    })
    this.finalMessage.emit('lose')
  }  

}
