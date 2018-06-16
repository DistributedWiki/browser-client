import { Component } from '@angular/core';

enum State {
  main,
  create,
  view
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Distributed wikipedia';
  state: State;

  constructor() {
    this.state = State.main;
  }

  async createArticle() {
    
  }

}
