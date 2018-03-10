import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';


import { AppComponent } from './app.component';
import { CellComponent } from './components/cell/cell.component';
import { BoardComponent } from './components/board/board.component';
import { GameModalComponent } from './components/game-modal/game-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    BoardComponent,
    GameModalComponent,  
    
  ],
  imports: [
    BrowserModule,
    BootstrapModalModule.forRoot({container:document.body})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
