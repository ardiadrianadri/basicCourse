import { ISuperHero } from './superhero';
import { ITable } from './../table/tableDefinition';
import { IMetadata } from './../table/metadataDefinition';
import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-form',
    templateUrl: './searchForm.component.html'
})
export class SearchFormComponent implements OnInit {
    public titleReset: string = 'Reset';
    public titleSearch: string = 'Search';
    public heroName: string;
    public tempAttr: string;
    public metadataTable: IMetadata[];
    public tableObj: ITable<ISuperHero>;
    public formatDate: string= 'us';
    private _lastSize: number = 5;

    public loading: boolean = false;

    constructor(private _searchService: SearchService, private _router: Router) { }

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
        this.loading = true;
        this._searchService.searchSuperHero(this.heroName, pageSize.page, pageSize.size)
            .subscribe(
                data => {
                    this.tableObj = data;
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                    console.error(JSON.stringify(error));
                }
            );
    }

    doAction(buttonTitle) {
        switch (buttonTitle) {
            case this.titleReset:
                this.heroName = '';
                break;
            case this.titleSearch:
                this.loading = true;
                this._searchService.searchSuperHero(this.heroName, 1, (this._lastSize) ? this._lastSize : 5)
                    .subscribe(
                        data => {
                            this.tableObj = data;
                            this.loading = false;
                        },
                        error => {
                            this.loading = false;
                            console.error(JSON.stringify(error));
                        }
                    );
                break;
        }
    }

    goDetail(id){
        this._router.navigate(['/details', id]);
    }
}
