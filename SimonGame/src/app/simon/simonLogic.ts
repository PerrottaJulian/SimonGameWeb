
export class simonLogic
{
    turn:number

    constructor()
    {
        this.turn = 0;
    }

    

    newTurn(){
        this.turn++
    }

    newGame(){
        this.turn = 0
    }

    
    
}