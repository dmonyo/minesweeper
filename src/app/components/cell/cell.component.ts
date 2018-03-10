import { Component, OnInit, Input } from '@angular/core';
import {Cell} from '../../models/cell'

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() data:Cell
  @Input() setCurrent:any // callback function 

  constructor() { 
    this.data = new Cell()
  }

  ngOnInit() {
  }
  /**
   * Toggle Flag icon in selected cell when right click
   * @param $event Right click event
   */
  setFlagInCell($event){
    $event.preventDefault()
    if(!this.data.isFlagged){
      this.data.isFlagged = true
      this.data.cellgliph = "glyphicon glyphicon-flag"
    }
    else{
      this.data.isFlagged = false
      this.data.cellgliph = ""
    }
  }

  /**
   * Reveal cell in board
   */
  revealCell(){
    this.setCurrent(this.data)
  }

}
