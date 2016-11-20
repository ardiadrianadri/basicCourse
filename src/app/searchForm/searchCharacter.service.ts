import { SuperHero } from './superHero';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchCharacter {
    public search (name: string, serieCode: string, eventCode: string): SuperHero[]{
        return [{
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
    }
}
