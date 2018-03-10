import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import {Modal} from '../../models/modal'

@Component({
  selector: 'game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.css']
})
export class GameModalComponent implements OnInit, AfterViewInit {
  
  @ViewChild('gamePopup') element
  _modal:Modal
  @Output() private onClose:EventEmitter<null>
  @Input('modal') set modal(modal:Modal){
    this._modal = modal
    if(this._modal.show){
      this.showModal()
    }
    else{
      this.closeModal()
    }    
  }
  constructor() {
      this.onClose = new EventEmitter<null>()
   }
  
  ngAfterViewInit(){
    console.log(this.element.nativeElement)
    //this.showModal()
  }

  ngOnInit() {
    
  }

  showModal = ()=>{
    this.element.nativeElement.className = "modal fade in show-modal"
  }

  closeModal = ()=>{
    this.element.nativeElement.className = "modal fade in"
    this.onClose.emit()
  }

}
