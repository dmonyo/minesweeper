export class Cell {
    public row: number
    public col: number
    public isBomb: boolean
    public isFlagged: boolean
    public countAround: number
    public isRevealed: boolean
    public cellgliph: string

    constructor(){
                    this.row = -1
                    this.col =  -1
                    this.isBomb =  false
                    this.isFlagged =  false
                    this.countAround =  0
                    this.isRevealed =  false
                    this.cellgliph = ''
                }
}
