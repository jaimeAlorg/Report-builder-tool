import { Component } from '@angular/core';
import { NavBar } from "./components/nav-bar/nav-bar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [NavBar, RouterOutlet],
})
export class App {
}
