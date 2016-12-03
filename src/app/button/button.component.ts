import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector:'my-button',
    templateUrl : './button.component.html'
})
export class ButtonComponent {
    @Input()
    public title: string;

    @Input()
    public type: string;

    @Output()
    public customClick = new EventEmitter();

    clicked () {
        this.customClick.emit(this.title);
    }
}
