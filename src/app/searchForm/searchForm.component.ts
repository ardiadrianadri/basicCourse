import { ISuperHero } from './superhero';
import { ITable } from './../table/tableDefinition';
import { IMetadata } from './../table/metadataDefinition';
import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
    selector: 'my-form',
    templateUrl : './searchForm.component.html'
})
export class SearchFormComponent implements OnInit {
    public titleReset: string = 'Reset';
    public titleSearch: string = 'Search';
    public heroName: string;
    public tempAttr: string;
    public metadataTable: IMetadata[];
    public tableObj: ITable<ISuperHero>;
    private _lastSize: number = 5;

    constructor (private _searchService: SearchService) {}

    ngOnInit () {
        this.metadataTable = this._searchService.metadata;
        this.tableObj = {
            totalNumber: 0,
            page: 1,
            totalPages: 1,
            size: 0,
            data: []
        };
    }

    updateTable (pageSize) {
        this._lastSize = pageSize.size;
        this.tableObj = this._searchService.searchSuperHero(this.heroName, pageSize.page, pageSize.size);
    }

    doAction (buttonTitle) {
        switch (buttonTitle) {
            case this.titleReset:
                this.heroName = '';
                break;
            case this.titleSearch:
                this.tableObj = this._searchService.searchSuperHero(this.heroName, 1, (this._lastSize) ? this._lastSize : 5);
                break;
        }
    }
}
