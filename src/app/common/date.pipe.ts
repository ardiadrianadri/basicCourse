import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateformat'})
export class DatePipe implements PipeTransform {

    transform( dateStr: string, format: string): string {
        let date: Date = new Date(dateStr);
        let result: string;

        if (format === 'us'){
            result = `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
        } else {
            result = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
        }

        return result;
    }
}
