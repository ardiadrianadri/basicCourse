import { Component } from '@angular/core';

@Component({
    selector: 'my-form',
    templateUrl : './searchForm.component.html'
})
export class SearchFormComponent {
    public titleReset: string = 'Reset';
    public titleSearch: string = 'Search';
    public tempAttr: string;

    doAction (buttonTitle) {
        this.tempAttr = buttonTitle;
    }
}
