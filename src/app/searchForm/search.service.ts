import { ITable } from './../table/tableDefinition';
import { Injectable } from '@angular/core';
import { IMetadata } from '../table/metadataDefinition';
import { ISuperHero } from './superhero';

import { AuthService } from '../common/auth.service';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchService {

    public metadata: IMetadata[] = [{
        header: 'Superhero name',
        key: 'name'
    }, {
        header: 'Last update',
        key: 'update'
    }, {
        header: 'Number of comics',
        key: 'comics'
    }, {
        header: 'Number of series',
        key: 'series'
    }, {
        header: 'Number of stories',
        key: 'stories'
    }, {
        header: 'Number of events',
        key: 'events'
    }];


    constructor (private _authService: AuthService, private _http: Http) {}

    public searchSuperHero (name: string, page: number, size: number): Observable<ITable<ISuperHero>> {

        let  url = 'v1/public/characters';
        let offset = ( page - 1 ) * size;
        let authOth = this._authService.getAuthQuery();

        url = url + `?limit=${size}&offset=${offset}`;
        url = url + `&ts=${authOth.ts}&apikey=${authOth.apiKey}&hash=${authOth.hash}`;
        url = url + `&nameStartWith=${name}`;

        return this._http.get(url)
        .map( response => {
            let responseObj = response.json();
            let tableObj: ITable<ISuperHero> = {
                totalNumber: responseObj.data.total,
                page: page,
                size: size,
                totalPages: 0,
                data: null
            };

            let totalPages = Math.floor( tableObj.totalNumber / size );
            tableObj.totalPages = ((tableObj.totalNumber % size) !== 0) ? ++totalPages : totalPages;
            tableObj.data = responseObj.data.results.map( element => {
                let superhero: ISuperHero = {
                    name: element.name,
                    update: element.modified,
                    comics: element.comics.available,
                    series: element.series.available,
                    stories: element.stories.available,
                    events: element.events.available
                };

                return superhero;
            });
            return tableObj;
        })
        .catch( error => Observable.throw(error));
    }
}
