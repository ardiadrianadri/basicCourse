import { ResultSearch } from './resultSearch';
import { TableComponent } from './../table/table.component';
import { SuperHero } from './superHero';
import { SearchCharacter } from './searchCharacter.service';
import { TableMetadata } from './../table/metadata';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './searchForm.component.html'
})
export class SearchFormComponent implements OnInit {
    public characterName: string = 'Iron man';
    public serieCode: string = '';
    public eventCode: string = '';
    public page: number = 1;
    public size: number = 5;
    public tableFormat: TableMetadata[] = [{
        title: 'Name',
        value: 'name'
    }, {
        title: 'Last update',
        value: 'update'
    }, {
        title: 'Character wiki',
        value: 'wiki'
    }];

    public tableContent: ResultSearch<SuperHero>;

    constructor (private _searchService: SearchCharacter) {}

    ngOnInit () {
        this.tableContent = this._searchService.search(this.characterName, this.serieCode, this.eventCode, this.page, this.size);
    }

    private _pressOnReset () {
       this.characterName = '';
       this.serieCode = '';
       this.eventCode = '';
    }

    private _pressOnSearch () {
        this.page = 1;
        this.tableContent = this._searchService.search(this.characterName, this.serieCode, this.eventCode, this.page, this.size);
    }

    public changePage (action: string) {
        switch (action) {
            case 'first':
                this.page = 1;
                break;
            case 'previos':
                this.page --;
                break;
            case 'next':
                this.page ++;
                break;
            case 'last':
                let lastPage = Math.floor(this.tableContent.total / this.size);
                this.page = ((this.tableContent.total % this.size) === 0) ? lastPage : lastPage ++;
                break;
        }

        this.tableContent = this._searchService.search(this.characterName, this.serieCode, this.eventCode, this.page, this.size);
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