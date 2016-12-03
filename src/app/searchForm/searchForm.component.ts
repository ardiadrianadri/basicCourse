import { Component } from '@angular/core';

@Component({
    selector: 'my-form',
    templateUrl: './searchForm.component.html'
})
export class SearchFormComponent {
    public resetTitle: string = 'Reset';
    public searchTitle: string = 'Search';
    public auxAttr: string;
    public heroName: string;

    doAnAction(titleButton) {
        this.auxAttr = titleButton;
    }
}
