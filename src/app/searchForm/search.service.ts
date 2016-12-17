import { IMetadata } from './../table/metadataDefinition';
import { IAuthentication } from './../common/authDefinition';
import { ITable } from './../table/tableDefinition';
import { Injectable } from '@angular/core';
import { ISuperHero } from './superhero';
import { Http } from '@angular/http';
import { AuthService } from '../common/auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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


    constructor(private _http: Http, private _authService: AuthService) { }


    public searchSuperHero(name: string, page: number, size: number): Observable<ITable<ISuperHero>> {
        let baseUrl = 'v1/public/characters';
        let offset = (page - 1) * size;
        let authObj: IAuthentication = this._authService.getAuthQuery();
        baseUrl = baseUrl + `?offset=${offset}&limit=${size}`;
        baseUrl = baseUrl + `&ts=${authObj.ts}&apikey=${authObj.apikey}&hash=${authObj.hash}`;
        baseUrl = baseUrl + `&nameStartsWith=${name}`;

        return this._http.get(baseUrl)
            .map(response => {
                let responseObj: any = response.json();
                let result: ITable<ISuperHero> = {
                    totalNumber: responseObj.data.total,
                    page: page,
                    totalPages: 0,
                    size: size,
                    data: null
                };

                let totalPages = Math.floor(result.totalNumber / size);
                result.totalPages = ((result.totalNumber % size) === 0) ? totalPages : ++totalPages;

                result.data = responseObj.data.results.map (marvelSuperHero => {
                    let superHero: ISuperHero = {
                        name: marvelSuperHero.name,
                        update: marvelSuperHero.modified,
                        comics: marvelSuperHero.comics.available,
                        series: marvelSuperHero.series.available,
                        stories: marvelSuperHero.stories.available,
                        events: marvelSuperHero.events.available
                    };

                    return superHero;
                });

                return result;
            }).catch(error => Observable.throw(error));
    }
}
