import { Component } from '@angular/core';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html'
})
export class TitleComponent {
    public header: string = 'Marvel Heroes Directory';
}