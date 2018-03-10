export class Cell {
    public row: number
    public col: number
    public isBomb: boolean
    public isFlagged: boolean
    public countAround: number
    public isRevealed: boolean
    public cellgliph: string = ''

    constructor(cell: {row:number, 
                col:number,
                isBomb:boolean,
                isFlagged:boolean,
                countAround:number,
                isRevealed:boolean,
                cellgliph:string}){
                    this.row = cell.row || 0
                    this.col = cell.col || 0
                    this.isBomb = cell.isBomb || false
                    this.isFlagged = cell.isFlagged || false
                    this.countAround = cell.countAround || 0
                    this.isRevealed = cell.isRevealed || false
                }
}
