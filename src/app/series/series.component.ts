import { Component, Input, OnInit } from '@angular/core';
import { SeriesService } from './series.service';

import { IMetadata } from '../table/metadataDefinition';
import { ITable } from '../table/tableDefinition';
import { ISeries } from './seiresDefinition';

@Component({
    selector: 'my-series',
    templateUrl: './series.component.html'
})
export class SerieComponent implements OnInit {

    @Input()
    public name: string = '';

    @Input()
    public characterId: string = '';

    public metadataTable: IMetadata[];
    public tableObj: ITable<ISeries> = {
        totalNumber: 0,
        page: 1,
        size: 5,
        totalPages: 1,
        data: []
    };

    public loading: boolean = true;
    public formatDate: string = 'us';

    constructor (private _serieService: SeriesService){}

    ngOnInit() {
        this.metadataTable = this._serieService.metadata;

        this._serieService.getSeries(this.characterId, 1, 5)
        .subscribe (
            data => {
                this.loading = false;
                this.tableObj = data;
            },
            error => {
                this.loading = false;
                console.error(JSON.stringify(error));
            }
        );
    }

    updateTable (pageSize) {
        this.loading = true;
        this._serieService.getSeries(this.characterId, pageSize.page, pageSize.size)
        .subscribe (
            data => {
                this.loading = false;
                this.tableObj = data;
            },
            error => {
                this.loading = false;
                console.error(JSON.stringify(error));
            }
        );
    }
}