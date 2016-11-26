import { Md5 } from 'ts-md5/dist/md5';
import { ResultSearch } from './resultSearch';
import { SuperHero } from './superHero';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchCharacter {
    public name: string;
    public serieCode: string;
    public eventCode: string;

    private _publicKey: string = '41bb31ed36d07454e7efc49bcfbc66b1';
    private _privateKey: string = '395b3c0f7c50cc9dac1f1d0368c1d8bda83931bf';
    private url: string = '/v1/public/characters';

    constructor (private _httpService: Http) {}

    private _buildUrl (page: number, size: number ): string {
        let ts: number = new Date().getTime();
        let md5: Md5 = new Md5();
        md5.appendStr(ts.toString());
        md5.appendStr(this._privateKey);
        md5.appendStr(this._publicKey);
        return `${this.url}?apikey=${this._publicKey}&limit=${size}&offset=${page}&hash=${md5.end()}&ts=${ts}`;
    }

    public search(page: number, size: number, name?: string, serieCode?: string, eventCode?: string): Promise<ResultSearch<SuperHero>> {
        let request = this._buildUrl (page, size);

        if (name) {
            this.name = name;
            request = request + `&nameStartsWith=${name}`;
        }

        if (serieCode) {
            this.serieCode = serieCode;
            request = request + `&series=${serieCode}`;
        }

        if (eventCode) {
            this.eventCode = eventCode;
            request = request + `&events=${eventCode}`;
        }

        console.log(`#### Url request: ` + request);
        return new Promise ((resolve, reject) => {
            this._httpService.get(request)
            .toPromise()
            .then ( response => {
                let marverlObj = JSON.parse(response['_body']);
                let superHeros: SuperHero[] = marverlObj.data.results.map(
                    (marvelHero) => {
                        let hero: SuperHero = {
                            id: marvelHero.id,
                            name: marvelHero.name,
                            update: marvelHero.modified,
                            wiki: marvelHero.urls[0].url
                        };

                        return hero;
                    }
                );

                let pages: number = Math.floor(marverlObj.data.total / size);
                pages = ((marverlObj.data.total % size) === 0 ) ? pages : pages ++;

                let result: ResultSearch<SuperHero> = {
                    total: marverlObj.data.total,
                    pages: pages,
                    result: superHeros
                };

                resolve(result);
            })
            .catch( error => {
                reject(error);
            });
        });
    }

    public changePage (page: number, size: number): Promise<ResultSearch<SuperHero>> {
        return this.search(page, size, this.name, this.serieCode, this.eventCode);
    }
}
