import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {DictionaryComponent} from './dictionary/dictionary.component';
import {TestingComponent} from './testing/testing.component';

const routes: Routes = [
  {path: '', redirectTo: 'dictionary', pathMatch: 'full'},
  {path: 'dictionary', component: DictionaryComponent},
  {path: 'testing', component: TestingComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
