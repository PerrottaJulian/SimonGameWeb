import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'simon',
  imports: [],
  templateUrl: './simon.component.html',
  styleUrl: './simon.component.scss'
})
export class SimonComponent implements OnInit, OnDestroy {
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private soundTimeout: any = null;

  redbotonActive : boolean = false
  bluebotonActive : boolean = false
  greenbotonActive : boolean = false
  yellowbotonActive : boolean = false

  constructor(){}

  ngOnInit():void {}
  ngOnDestroy(): void {}


  onClick(button:string, freq:number){
    this.activateButton(button)

    if(this.oscillator){
      this.stopTone()
      this.deactivateAll()

    }else{
      this.playTone(freq)      
      this.soundTimeout = setTimeout(() => {
        this.stopTone()
        this.deactivateAll()
      }, 1000);
    }

    
  }

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
      this.deactivateAll()
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

  activateButton(button:string)
  {
    switch (button)
    {
      case 'red':
        this.redbotonActive = true
        break;

      case 'blue':
        this.bluebotonActive = true
        break;

      case 'green':
        this.greenbotonActive = true
        break;

      case 'yellow':
        this.yellowbotonActive = true
        break;
    }
  }

  deactivateButton(button:string)
  {
    switch (button)
    {
      case 'red':
        this.redbotonActive = false
        break;

      case 'blue':
        this.bluebotonActive = false
        break;

      case 'green':
        this.greenbotonActive = false
        break;

      case 'yellow':
        this.yellowbotonActive = false
        break;
    }
  }
  
  deactivateAll()
  {
    this.redbotonActive = false 
    this.greenbotonActive = false 
    this.bluebotonActive = false
    this.yellowbotonActive = false
  }


}
