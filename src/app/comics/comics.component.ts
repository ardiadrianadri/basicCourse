import { Component, Input, OnInit } from '@angular/core';
import { IComic } from './comicsDefinition';
import { IMetadata } from '../table/metadataDefinition';
import { ITable } from '../table/tableDefinition';
import { ComicsService } from './comics.service';

@Component ({
    selector: 'my-comics',
    templateUrl: './comics.component.html'
})
export class ComicsComponent implements OnInit {

    @Input()
    public name: string;

    @Input()
    public characterId: string;

    public metadataTable: IMetadata[];
    public tableObj: ITable<IComic> = {
        totalNumber: 0,
        totalPages: 1,
        size: 5,
        page: 1,
        data: []
    };

    public formatDate: string = 'us';
    public loading: boolean = true;

    constructor (private _comicsService: ComicsService) {}

    ngOnInit() {
        this.metadataTable = this._comicsService.metadata;
        this._comicsService.getComics(this.characterId, 1, 5)
        .subscribe (
            data => {
                this.loading = false;
                this.tableObj = data;
            },
            error => {
                this.loading = false;
                console.error (JSON.stringify(error));
            }
        );
    }

    updateTable (pageSize:any) {
        this.loading = true;
        this._comicsService.getComics(this.characterId, pageSize.page, pageSize.size)
        .subscribe (
            data => {
                this.loading = false;
                this.tableObj = data;
            },
            error => {
                this.loading = false;
                console.error (JSON.stringify(error));
            }
        );
    }
}
