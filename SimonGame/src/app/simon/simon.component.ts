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

  botonActive:boolean = true

  @ViewChild('redB', { static: true }) redB!: ElementRef<HTMLButtonElement>;

  /*ngAfterViewInit() {
    // Simula el clic después de que la vista ha sido inicializada
    setTimeout(() => {
      this.redB.nativeElement.click();
    }, 2000); // Presiona automáticamente el botón después de 2 segundos
  }*/

  constructor(/*@Inject(DOCUMENT) private document: Document*/){}

  ngOnInit()
  {
    //this.document.addEventListener('mouseup', this.stopTone.bind(this));
  }
  
  ngOnDestroy(): void {
    // Remover el evento global al destruir el componente
    //this.document.removeEventListener('mouseup', this.stopTone.bind(this));
  }

  onClick(freq:number){

    if(this.oscillator){
      this.stopTone()

    }else{
      this.playTone(freq)      
      this.soundTimeout = setTimeout(() => {
        this.stopTone()
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



}
