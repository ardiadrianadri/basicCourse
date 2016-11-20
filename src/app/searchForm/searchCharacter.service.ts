import { ResultSearch } from './resultSearch';
import { SuperHero } from './superHero';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchCharacter {
    public name: string;
    public serieCode: string;
    public eventCode: string;

    public search(name: string, serieCode: string, eventCode: string, page: number, size: number): ResultSearch<SuperHero> {
        let heroes: SuperHero[] = [{
            id: 1,
            name: 'Spider-man',
            update: new Date(),
            wiki: 'Super hero wiki'
        }, {
            id: 1,
            name: 'Iron man',
            update: new Date(),
            wiki: 'Super hero wiki'
        }, {
            id: 1,
            name: 'Thor',
            update: new Date(),
            wiki: 'Super hero wiki'
        }, {
            id: 1,
            name: 'Capitan America',
            update: new Date(),
            wiki: 'Super hero wiki'
        }, {
            id: 1,
            name: 'Lizard',
            update: new Date(),
            wiki: 'Super hero wiki'
        }, {
            id: 1,
            name: 'Dr Doom',
            update: new Date(),
            wiki: 'Super hero wiki'
        }, {
            id: 1,
            name: 'Loki',
            update: new Date(),
            wiki: 'Super hero wiki'
        }, {
            id: 1,
            name: 'Mr Fantastic',
            update: new Date(),
            wiki: 'Super hero wiki'
        }, {
            id: 1,
            name: 'Invisible Woman',
            update: new Date(),
            wiki: 'Super hero wiki'
        }, {
            id: 1,
            name: 'Ms Marvel',
            update: new Date(),
            wiki: 'Super hero wiki'
        }];

        let firstElement: number = (page - 1) * size;
        let lastElement: number = firstElement + size;
        let leng: number = heroes.length;
        lastElement = ( lastElement > leng) ? leng : lastElement;

        let result: ResultSearch<SuperHero> = {
            total: heroes.length,
            result: heroes.slice(firstElement, lastElement)
        }

        return result;
    }

    public changePage (page: number, size: number): ResultSearch<SuperHero>{
        return this.search('', '', '', page, size);
    }
}
