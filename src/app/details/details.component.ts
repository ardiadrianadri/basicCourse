import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { IDetails } from './detailsDefinition';

@Component({
    selector: 'my-details',
    templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {

    public details: IDetails = {
        file: {
            name: '',
            story: '',
            image: 'assets/hulk.gif'
        }
    };

    public id: string = '1009368';

    constructor ( private service: DetailsService ) {}

    ngOnInit () {
        this.service.getDetails(this.id)
        .subscribe(
            data => {
                this.details = data;
            },
            error => {
                console.error(error);
            }
        );
    }
}
