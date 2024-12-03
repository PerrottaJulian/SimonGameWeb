import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import bootstrap from '../../main.server';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SimonGame';
}

