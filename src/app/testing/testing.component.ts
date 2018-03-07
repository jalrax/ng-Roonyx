import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { WordsService } from '../words.service';
import { Words } from '../shared/models/words.model';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit, OnDestroy {

  words: Words[] = [];
  wordsBuffer: Words[] = [];
  slicedWords: Words[] = [];
  buffer: Words[] = [];

  options: string[] = [];
  answers: string[] = [];
  ruNames: string[] = [];

  isLoaded = false;
  subscription: Subscription;
  qnProgress = 0;

  constructor(private wordsService: WordsService, private router: Router) {
  }

  static shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  static shuffleNSlice(arr, sliceArg) {
    const buffer = arr.slice(0, sliceArg);
    return TestingComponent.shuffle(buffer);
  }

  ngOnInit() {
    this.subscription = this.wordsService
      .getWords()
      .subscribe((words: Words[]) => {
        this.words = words;
        this.wordsBuffer = this.words;
        this.slicedWords = TestingComponent.shuffleNSlice(this.wordsBuffer, 21);
        this.slicedWords.forEach((e) => {
          this.options.push(e.ruName);
        });
        this.options = TestingComponent.shuffleNSlice(this.options, 6);
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  Answer(choice, ruName) {
    this.buffer = [];
    this.options = [];

    this.buffer = this.wordsBuffer;
    this.buffer.forEach(item => {
      if (item.ruName !== this.slicedWords[this.qnProgress + 1].ruName) {
        this.options.push(item.ruName);
      }
    });
    this.options = TestingComponent.shuffleNSlice(this.options, 5);
    this.options.push(this.slicedWords[this.qnProgress + 1].ruName);
    this.options = TestingComponent.shuffle(this.options);

    this.answers.push(choice);
    this.ruNames.push(ruName);
    this.qnProgress++;
    if (this.qnProgress === 20) {
      localStorage.setItem('answers', JSON.stringify(this.answers));
      localStorage.setItem('ruNames', JSON.stringify(this.ruNames));
      this.router.navigate(['/result']);
    }
  }
}
