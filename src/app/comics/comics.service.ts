import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IMetadata } from '../table/metadataDefinition';
import { ITable } from '../table/tableDefinition';
import { IComic } from './comicsDefinition';
import { AuthService } from '../common/auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ComicsService {

    public metadata: IMetadata[] = [{
        header: 'Title',
        key: 'name'
    }, {
        header: 'On sale (date)',
        key: 'onSale'
    }, {
        header: 'Price ($)',
        key: 'price'
    }];

    constructor ( private _http: Http, private _auth: AuthService ){}

    getComics (id: string, page: number, size: number): Observable<ITable<IComic>> {
        let auth = this._auth.getAuthQuery();
        let offset = (page - 1) * size;
        let url = `/v1/public/characters/${id}/comics`;

        url = url + `?ts=${auth.ts}&apikey=${auth.apiKey}&hash=${auth.hash}`;
        url = url + `&limit=${size}&offset=${offset}`;

        return this._http.get(url)
        .map (response => {
            let responseObj = response.json();
            let tableObj: ITable<IComic> = {
                totalNumber: responseObj.data.total,
                size: size,
                page: page,
                totalPages: 0,
                data: null
            };

            let totalPages = Math.floor(tableObj.totalNumber / size);

            tableObj.totalPages = ((tableObj.totalNumber % size) > 0) ? ++totalPages : totalPages;

            tableObj.data = responseObj.data.results.map ( elementComic => {
                let comic: IComic = {
                    name: elementComic.title,
                    onSale: elementComic.dates.filter ( elementDate => elementDate.type === 'onsaleDate')[0].date,
                    price: elementComic.prices.filter ( elementPrice => elementPrice.type === 'printPrice')[0].price
                };

                return comic;
            });

            return tableObj;
        })
        .catch (error => Observable.throw(error));

    }
}