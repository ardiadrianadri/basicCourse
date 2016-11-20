import { SearchCharacter } from './searchForm/searchCharacter.service';
import { ButtonComponent } from './button/button.component';
import { SearchFormComponent } from './searchForm/searchForm.component';
import { TitleComponent } from './title/title.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    SearchFormComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    SearchCharacter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
