import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { WordsService } from '../words.service';
import { Words } from '../shared/models/words.model';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit, OnDestroy {

  words: Words[] = [];
  isLoaded = false;
  subscription: Subscription;

  constructor(private wordsService: WordsService, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.wordsService
      .getWords()
      .subscribe((words: Words[]) => {
        this.words = words;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  newWordAdded(word: Words) {
    this.words.push(word);
  }

  wordWasEdited(word: Words) {
    const idx = this.words
      .findIndex(w => w.id === word.id);
    this.words[idx] = word;
  }

  wordDeleted(word: Words) {
    const idx = this.words
      .findIndex(w => w.id === word.id);
    this.words.splice(idx, 1);
  }

  onButtonClick() {
    if (this.words.length < 21) {
      alert('Your words pull contains less than 20 words.' +
        ' You need at least this amount to start a test. Please add a lacking words');
    } else {
      this.router.navigate(['/testing']);
    }
  }
}
