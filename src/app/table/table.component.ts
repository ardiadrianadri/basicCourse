import { ITable } from './tableDefinition';
import { IMetadata } from './metadataDefinition';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-table',
    templateUrl: './table.component.html'
})
export class TableComponent {

    @Input()
    public metadata: IMetadata[] = [];

    @Input()
    public tableObj: ITable<any> = {
        totalNumber: 0,
        page: 1,
        totalPages: 1,
        size: 5,
        data: []
    };

    @Input()
    public dateLocaleFormat: string = 'eu';

    @Output()
    public refreshTable = new EventEmitter();

    public size: number = 5;

    private _newSize (size) {

        if (size > this.tableObj.totalNumber) {
            size = this.tableObj.totalNumber;
        } else if (size < 1) {
            size = 1;
        }

        let mod = this.tableObj.totalNumber % size;
        this.tableObj.totalPages = (mod > 0) ?
            (Math.floor(this.tableObj.totalNumber / size) + 1) :
            Math.floor(this.tableObj.totalNumber / size);

        this.tableObj.size = size;
    }


    requestData ( page, size ) {

        if (size !== this.tableObj.size) {
            this._newSize(size);
        }

        if (page < 0) {
            page = 0;
        } else if ( page > this.tableObj.totalPages) {
            page = this.tableObj.totalPages;
        }

        this.refreshTable.emit({page: page, size: size});
    }

}
