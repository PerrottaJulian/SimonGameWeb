import { log } from "node:console";

export class simonLogic
{
    private buttons = ["red","blue","green","yellow"] 

    turn:number
    sequence:string[]


    constructor()
    {
        this.turn = 0;
        this.sequence = []
    }

    newTurn():void{
        this.turn++
    }

    newGame():void{
        this.turn = 0
    }

    addToSequence():void{
        const randomButton = Math.floor(Math.random() *this.buttons.length)
        const selectedButton = this.buttons[randomButton]

        console.log("Se añadio el boton: "+selectedButton)

        this.sequence.push(selectedButton)

        console.log("Secuencia:\n" + this.sequence )
        console.log("----------------------------------------")
    }

    
    
}