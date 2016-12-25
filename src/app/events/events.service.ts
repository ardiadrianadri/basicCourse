import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../common/auth.service';

import { IMetadata } from '../table/metadataDefinition';
import { ITable } from '../table/tableDefinition';
import { IEvents } from './eventsDefinition';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EventsService {

    public metadata: IMetadata[] = [{
        header: 'Title',
        key: 'name'
    }, {
        header: 'Start date',
        key: 'startDate'
    }, {
        header: 'End date',
        key: 'endDate'
    }];

    constructor (private _http: Http, private _auth: AuthService){}

    getEvents (id: string, page: number, size: number): Observable<ITable<IEvents>> {
        let auth = this._auth.getAuthQuery();
        let offset = (page - 1) * size;
        let url = `/v1/public/characters/${id}/events`;

        url = url + `?ts=${auth.ts}&apikey=${auth.apiKey}&hash=${auth.hash}`;
        url = url + `&limit=${size}&offset=${offset}`;

        return this._http.get(url)
        .map( response => {
            let responseObj = response.json();
            let tableObj: ITable<IEvents> = {
                totalNumber: responseObj.data.total,
                page: page,
                size: size,
                totalPages: 0,
                data: null
            };

            let totalPages = Math.floor( tableObj.totalNumber / size);
            tableObj.totalPages = ((tableObj.totalNumber % size) > 0) ? ++totalPages : totalPages;
            tableObj.data = responseObj.data.results.map( element => {
                let event: IEvents = {
                    name: element.title,
                    startDate: element.start,
                    endDate: element.end
                };

                return event;
            });
            return tableObj;
        })
    }
}