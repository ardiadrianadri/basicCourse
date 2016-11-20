import { TableMetadata } from './metadata';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.componnent.html'
})
export class TableComponent {
    @Input()
    public descriptionTable: TableMetadata [];

    @Input()
    public content: any[];

    @Output()
    public firstPage = new EventEmitter();

    @Output()
    public lastPage = new EventEmitter();

    @Output()
    public nextPage = new EventEmitter();

    @Output()
    public previusPage = new EventEmitter();

    movePage(title) {
        switch (title) {
            case '<<':
                this.firstPage.emit();
                break;
            case '<':
                this.previusPage.emit();
                break;
            case '>':
                this.nextPage.emit();
                break;
            case '>>':
                this.lastPage.emit();
        }
    }
}
