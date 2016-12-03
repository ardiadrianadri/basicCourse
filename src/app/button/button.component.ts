import { Component, Input } from '@angular/core';

@Component({
    selector:'my-button',
    templateUrl : './button.component.html'
})
export class ButtonComponent {
    @Input()
    public title: string;
}
