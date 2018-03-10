export class Modal {
    public type:string
    public messageHeader: string
    public messageContent: string
    public show: boolean

    constructor(){
        this.type = ''
        this.messageHeader = ""
        this.messageContent = ""
        this.show = false
    }
}
