import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateformat'})
export class DatePipe implements PipeTransform {
    transform (date: string) {}
}