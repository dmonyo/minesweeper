import { Component, OnInit, ViewChild } from '@angular/core';
import { Modal } from './models/modal';
import { BoardComponent } from './components/board/board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';  
  private modal: Modal = new Modal
  @ViewChild("board") private board:BoardComponent

  closeMessage(){
    this.board.rePrintBoard(9)
  }
  
  /**
   * Create Modal messages ato show in page
   * @param type Type of message (Winner or Loser)
   */
  showMessage(type){
    switch(type){
      case 'win':
        this.modal = {
          type:type,
          messageHeader: "Congratulations!!",
          messageContent: "You have won the game!",
          show:true
        }
        break
      case 'lose':
        this.modal = {
          type:type,
          messageHeader: "I am sorry!!",
          messageContent: "You have lost the game!",
          show:true
        }
        break
    }    
  }
}
