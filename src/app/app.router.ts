import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SearchFormComponent } from './searchForm/searchForm.component';
import { DetailsComponent } from './details/details.component';

export const routing: ModuleWithProviders = RouterModule.forRoot([
    { path: '', component: SearchFormComponent },
    { path: 'search', component: SearchFormComponent },
    { path: 'details/:id', component: DetailsComponent }
]);
