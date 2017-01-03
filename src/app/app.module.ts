import { TableComponent } from './table/table.component';
import { SearchFormComponent } from './searchForm/searchForm.component';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchService } from './searchForm/search.service';
import { AuthService } from './common/auth.service';
import { DatePipe } from './common/date.pipe';
import { SuperHeroFileComponent } from './superHeroFile/superHeroFile.component';
import { DetailsComponent } from './details/details.component';
import { DetailsService } from './details/details.service';
import { ComicsService } from './comics/comics.service';
import { ComicsComponent } from './comics/comics.component';
import { SeriesService } from './series/series.service';
import { SerieComponent } from './series/series.component';
import { EventsService } from './events/events.service';
import { EventsComponent } from './events/events.component';
import { routing } from './app.router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchFormComponent,
    ButtonComponent,
    TableComponent,
    DatePipe,
    SuperHeroFileComponent,
    DetailsComponent,
    ComicsComponent,
    SerieComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    SearchService,
    AuthService,
    DetailsService,
    ComicsService,
    SeriesService,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
