import { Component } from '@angular/core';
import { NavBar } from "./components/task-bar/nav-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [NavBar],
})
export class App {
}
