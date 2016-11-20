import { Component } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './searchForm.component.html'
})
export class SearchFormComponent {
    private _pressOnReset () {
        console.log('Button reset has been pressed');
    }

    private _pressOnSearch () {
        console.log('Button search has been pressed');
    }

    public buttonPressed(title){
        if (title === 'Reset') {
            this._pressOnReset();
        } else if (title === 'Search') {
            this._pressOnSearch();
        } else {
            console.error('No event match with this button');
        }
    }
}