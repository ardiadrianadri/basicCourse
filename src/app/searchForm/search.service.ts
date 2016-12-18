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

    public lastResult: ISuperHero[] = [{
        name: 'SuperDuck',
        update: '01/01/2010',
        comics: 100,
        series: 100,
        stories: 100,
        events: 100
    }, {
        name: 'SuperPot',
        update: '02/01/2010',
        comics: 200,
        series: 200,
        stories: 200,
        events: 200
    }, {
        name: 'SuperChair',
        update: '03/01/2010',
        comics: 300,
        series: 300,
        stories: 300,
        events: 300
    }, {
        name: 'SuperStick',
        update: '04/01/2010',
        comics: 400,
        series: 400,
        stories: 400,
        events: 400
    }, {
        name: 'SuperLazy',
        update: '05/01/2010',
        comics: 500,
        series: 500,
        stories: 500,
        events: 500
    }, {
        name: 'Superspaghetti',
        update: '06/01/2010',
        comics: 600,
        series: 600,
        stories: 600,
        events: 600
    }, {
        name: 'SuperCheese',
        update: '07/01/2010',
        comics: 700,
        series: 700,
        stories: 700,
        events: 700,
    }, {
        name: 'SuperCarrot',
        update: '08/01/2010',
        comics: 800,
        series: 800,
        stories: 800,
        events: 800,
    }, {
        name: 'SuperPen',
        update: '09/01/2010',
        comics: 900,
        series: 900,
        stories: 900,
        events: 900,
    }, {
        name: 'SuperFork',
        update: '10/01/2010',
        comics: 110,
        series: 110,
        stories: 110,
        events: 110,
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
            return tableObj;
        })
    }
}
