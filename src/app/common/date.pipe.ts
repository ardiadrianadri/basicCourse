import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateformat'})
export class DatePipe implements PipeTransform {
    transform (date: string, format: string) {
        let dateObj= new Date(date);
        let result;

        if (format === 'us') {
            result = `${(dateObj.getMonth() + 1)} / ${dateObj.getDate()} / ${dateObj.getFullYear()}`;
        } else {
            result = `${dateObj.getDate()} / ${(dateObj.getMonth() + 1)} / ${dateObj.getFullYear()}`;
        }

        return result;
    }
}