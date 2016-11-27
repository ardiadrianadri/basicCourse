import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.css', '../../node_modules/bootstrap/dist/css/bootstrap-theme.css']
})
export class AppComponent {
  msg1 = 'app works!';
  msg2 = 'Hello world!!';

  public sendAlert() {
    alert(`Value of msg1: ${this.msg1}. Value of msg2: ${this.msg2}`);
  }
}
