import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from './events.service';

import { IMetadata } from '../table/metadataDefinition';
import { ITable } from '../table/tableDefinition';
import { IEvents } from './eventsDefinition';

@Component ({
    selector: 'my-marvelEvents',
    templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {

    @Input()
    public name: string;

    @Input()
    public characterId: string;

    public formatDate: string = 'us';
    public loading: boolean = true;

    public metadataTable: IMetadata[];
    public tableObj: ITable<IEvents> = {
        totalNumber: 0,
        page: 1,
        size: 1,
        totalPages: 1,
        data: []
    };

    constructor (private _eventService: EventsService) {}

    ngOnInit () {
        this.metadataTable = this._eventService.metadata;

        this._eventService.getEvents(this.characterId, 1, 5)
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

    updateTable(pageSize){
        this.loading= true;
        this._eventService.getEvents(this.characterId, pageSize.page, pageSize.size)
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