import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.css', '../../node_modules/bootstrap/dist/css/bootstrap-theme.css']
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
