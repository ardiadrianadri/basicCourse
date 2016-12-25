import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../common/auth.service';
import { IDetails } from './detailsDefinition';
import { ISuperHero } from '../superHeroFile/superHeroFileDefinition';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DetailsService {

    constructor(private _http: Http, private _auth: AuthService) { }

    public getDetails(id: string): Observable<IDetails> {
        let auth = this._auth.getAuthQuery();
        let url = '/v1/public/characters/';

        url = url + id;
        url = url + `?ts=${auth.ts}&apikey=${auth.apiKey}&hash=${auth.hash}`;

        return this._http.get(url)
            .map(response => {
                let responseObj = response.json();
                let superHero: ISuperHero = {
                    name: responseObj.data.results[0].name,
                    story: responseObj.data.results[0].description,
                    image: responseObj.data.results[0].thumbnail.path + '.' + responseObj.data.results[0].thumbnail.extension
                };

                let result: IDetails = {
                    file: superHero
                };

                return result;
            })
            .catch(error => Observable.throw(error));
    }
}