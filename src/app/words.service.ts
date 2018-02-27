import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Words} from './shared/models/words.model';
import {BaseApi} from './shared/api/base-api';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WordsService extends BaseApi{

  constructor(public http: HttpClient) {
    super(http);
  }

  addWord(word: Words): Observable<Words> {
    return this.post('words', word);
  }

  getWords(): Observable<Words[]> {
    return this.get('words');
  }

  updateWord(word: Words): Observable<Words> {
    return this.put(`words/${word.id}`, word);
  }

}
