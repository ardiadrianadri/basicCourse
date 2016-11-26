import { ResultSearch } from './resultSearch';
import { TableComponent } from './../table/table.component';
import { SuperHero } from './superHero';
import { SearchCharacter } from './searchCharacter.service';
import { TableMetadata } from './../table/metadata';
import { Component, OnInit, Injectable } from '@angular/core';

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
        this.tableContent = {
            total: 0,
            pages: 0,
            result: []
        };

        this._searchService.search (this.page, this.size, this.characterName, this.serieCode, this.eventCode)
        .then (data => { this.tableContent = data; })
        .catch(error => { throw new Error (error); });
    }

    private _pressOnReset () {
       this.characterName = '';
       this.serieCode = '';
       this.eventCode = '';
    }

    private _pressOnSearch () {
        this.page = 1;
        this._searchService.search (this.page, this.size, this.characterName, this.serieCode, this.eventCode)
        .then (data => { this.tableContent = data; })
        .catch(error => { throw new Error (error); });
    }

    public changePage (action: string) {
        switch (action) {
            case 'first':
                this.page = 1;
                break;
            case 'previos':
                if (this.page > 1) {
                    this.page --;
                }
                break;
            case 'next':
                if (this.page < this.tableContent.pages){
                    this.page ++;
                }
                break;
            case 'last':
                let lastPage = Math.floor(this.tableContent.total / this.size);
                this.page = ((this.tableContent.total % this.size) === 0) ? lastPage : lastPage ++;
                break;
        }

       this._searchService.search (this.page, this.size, this.characterName, this.serieCode, this.eventCode)
        .then (data => { this.tableContent = data; })
        .catch(error => { throw new Error (error); });
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