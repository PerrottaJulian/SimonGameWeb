import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import bootstrap from '../../main.server';
import { SimonComponent } from '../simon/simon.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SimonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SimonGame';
}

