import { ISuperHero } from './superhero';
import { ITable } from './../table/tableDefinition';
import { IMetadata } from './../table/metadataDefinition';
import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
    selector: 'my-form',
    templateUrl: './searchForm.component.html',
    styleUrls: ['./searchForm.component.css']
})
export class SearchFormComponent implements OnInit {
    public titleReset: string = 'Reset';
    public titleSearch: string = 'Search';
    public heroName: string;
    public tempAttr: string;
    public metadataTable: IMetadata[];
    public tableObj: ITable<ISuperHero>;
    public loading: boolean = false;

    private _lastSize: number = 5;

    constructor(private _searchService: SearchService) { }

    private _launchSearch(name: string, page: number, size: number) {

        this.loading = true;
        this._searchService.searchSuperHero(name, page, size)
            .subscribe(
            data => { 
                this.tableObj = data;
                this.loading = false;
            },
            error => { console.error(`Error: ${JSON.stringify(error)}`); }
            );
    }

    ngOnInit() {
        this.metadataTable = this._searchService.metadata;
        this.tableObj = {
            totalNumber: 0,
            page: 1,
            totalPages: 1,
            size: 0,
            data: []
        };
    }

    updateTable(pageSize) {
        this._lastSize = pageSize.size;
        this._launchSearch(this.heroName, pageSize.page, pageSize.size);
    }

    doAction(buttonTitle) {
        switch (buttonTitle) {
            case this.titleReset:
                this.heroName = '';
                break;
            case this.titleSearch:
                this._launchSearch(this.heroName, 1, (this._lastSize) ? this._lastSize : 5);
                break;
        }
    }
}
