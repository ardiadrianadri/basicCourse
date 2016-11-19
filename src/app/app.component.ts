import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit() {
    this.title = 'The value has changed';
  }

  pressButton () {
    alert (`Value of title: ${this.title}`);
  }
}
