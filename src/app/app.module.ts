import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {DictionaryComponent} from './dictionary/dictionary.component';
import {AddWordComponent} from './dictionary/add-word/add-word.component';
import {EditWordComponent} from './dictionary/edit-word/edit-word.component';
import {ListWordComponent} from './dictionary/list-word/list-word.component';
import {WordsService} from './words.service';
import {AppRoutingModule} from './app-routing.module';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import { TestingComponent } from './testing/testing.component';


@NgModule({
  declarations: [
    AppComponent,
    DictionaryComponent,
    AddWordComponent,
    EditWordComponent,
    ListWordComponent,
    NotFoundComponent,
    TestingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [WordsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
