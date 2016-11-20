import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @Input()
    public title: string;

    @Input()
    public type: string;

    @Output()
    public pressButton = new EventEmitter();

    buttonClick() {
        this.pressButton.emit(this.title);
    }
}
