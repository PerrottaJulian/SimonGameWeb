import {AfterViewInit, BootstrapOptions, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { simonLogic } from './simonLogic';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'simon',
  imports: [CommonModule],
  templateUrl: './simon.component.html',
  styleUrl: './simon.component.scss'
})
export class SimonComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('botonRojo', { static: true }) botonRojo!: ElementRef<HTMLButtonElement>;

  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private soundTimeout: any = null;

  redButtonPlaying : boolean = false
  blueButtonPlaying : boolean = false
  greenButtonPlaying : boolean = false
  yellowButtonPlaying : boolean = false

  buttonsDisabled:boolean = false

  machineTurn:boolean = false
  playerTurn:boolean = false

  game:simonLogic = new simonLogic()

  constructor(){} 
  
  ngOnInit():void {
   
  }

  ngOnDestroy(): void {}
  ngAfterViewInit(): void {}

  startGame(){
    this.machineTurn = true
    this.game.addToSequence()

  }


  onClick(button:string){
    this.playingButton(button)
    const freq:number = this.getFreq(button)

    if(this.oscillator){
      this.stopTone()
      this.stopPlayingAll()

    }else{
      this.playTone(freq)      
      this.soundTimeout = setTimeout(() => {
        this.stopTone()
        this.stopPlayingAll()
      }, 1000);

      this.game.newTurn()
    }
    
  }

  //Tone functions

  playTone(freq:number):void
  {
    if (!this.audioContext){
      this.audioContext = new AudioContext()
    }

    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = 'sine'; // Tipo de onda: sine, square, sawtooth, triangle
    this.oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime); // Frecuencia en Hz
    this.oscillator.connect(this.audioContext.destination); // Conectar al destino (altavoces)

    this.oscillator.start(); // Iniciar el tono
  }

  stopTone():void
  {
    if(this.oscillator){
      this.stopPlayingAll()
      this.oscillator.stop();
      this.oscillator.disconnect()
      this.oscillator = null;
    }
    // Limpiar cualquier temporizador en caso de que se necesite
    if (this.soundTimeout) {
      clearTimeout(this.soundTimeout);
      this.soundTimeout = null;
    }

    
  }

  getFreq(button:string):number{
    switch (button)
    {
      case 'red':
        return 261.63

      case 'blue':
        return 329.63

      case 'green':
        return 392.00

      case 'yellow':
        return 523.25

      default:
        return 0
    }
  }

  //Functions to activate the button´s style when played
  playingButton(button:string)
  {
    switch (button)
    {
      case 'red':
        this.redButtonPlaying = true
        break;

      case 'blue':
        this.blueButtonPlaying = true
        break;

      case 'green':
        this.greenButtonPlaying = true
        break;

      case 'yellow':
        this.yellowButtonPlaying = true
        break;
    }
  }

  //Deactivate Functios
  stopPlayingAll()
  {
    this.redButtonPlaying = false 
    this.greenButtonPlaying = false 
    this.blueButtonPlaying = false
    this.yellowButtonPlaying = false
  }

  test(){
    this.buttonsDisabled = !this.buttonsDisabled
  }

  test2(){
    this.onClick('red')
  }


  Turn():void
  {

  }





}
