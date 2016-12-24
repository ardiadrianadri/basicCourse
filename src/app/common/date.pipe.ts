import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateformat'})
export class DatePipe implements PipeTransform {
    transform (date: string) {
        let dateObj= new Date(date);
        let result = `${(dateObj.getMonth() + 1)} / ${dateObj.getDate()} / ${dateObj.getFullYear()}`;

        return result;
    }
}