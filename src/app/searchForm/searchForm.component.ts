import { Component } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './searchForm.component.html'
})
export class SearchFormComponent {
    public characterName: string;
    public serieCode: string;
    public eventCode: string;

    private _pressOnReset () {
       this.characterName = '';
       this.serieCode = '';
       this.eventCode = '';
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