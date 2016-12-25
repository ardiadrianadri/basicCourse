import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../common/auth.service';

import { IMetadata } from '../table/metadataDefinition';
import { ITable } from '../table/tableDefinition';
import { ISeries } from './seiresDefinition';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SeriesService {

    public metadata: IMetadata[] = [{
        header: 'Title',
        key: 'name'
    }, {
        header: 'Start year',
        key: 'startYear'
    }, {
        header: 'End year',
        key: 'endYear'
    }];

    constructor (private _http:Http, private _auth: AuthService){}

    getSeries (id: string, page: number, size: number): Observable<ITable<ISeries>> {
        let auth = this._auth.getAuthQuery();
        let url = `/v1/public/characters/${id}/series`;
        let offset = (page - 1) * size;

        url = url + `?ts=${auth.ts}&apikey=${auth.apiKey}&hash=${auth.hash}`;
        url = url + `&limit=${size}&offset=${offset}`;

        return this._http.get(url)
        .map( response => {
            let responseObj = response.json();
            let tableObj: ITable<ISeries> = {
                totalNumber: responseObj.data.total,
                page: page,
                size: size,
                totalPages: 0,
                data: null
            };

            let totalPages = Math.floor(tableObj.totalNumber / size);
            tableObj.totalPages = ((tableObj.totalNumber % size) > 0) ? ++totalPages : totalPages;

            tableObj.data = responseObj.data.results.map (element => {
                let serie: ISeries = {
                    name: element.title,
                    startYear: element.startYear,
                    endYear: element.endYear
                };

                return serie;
            });

            return tableObj;
        })
        .catch (error => Observable.throw(error));
    }
}