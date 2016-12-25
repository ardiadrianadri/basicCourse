import { Component, Input } from '@angular/core';
import { ISuperHero } from './superHeroFileDefinition';

@Component({
    selector: 'my-superheroFile',
    templateUrl: './superHeroFile.component.html',
    styleUrls: ['./superHeroFile.component.css']
})
export class SuperHeroFileComponent {

    @Input()
    public superHero: ISuperHero;
}