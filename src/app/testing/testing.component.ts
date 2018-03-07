import {Component, OnDestroy, OnInit} from '@angular/core';
import {Words} from '../shared/models/words.model';
import {Subscription} from 'rxjs/Subscription';
import {WordsService} from '../words.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit, OnDestroy {

  words: Words[] = [];
  wordsBuffer = [];
  slicedWords = [];
  options = [];
  buffer;
  isLoaded = false;
  sub1: Subscription;

  qnProgress = 0;
  answers = [];
  ruNames = [];

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
    this.sub1 = this.wordsService.getWords()
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
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  Answer(choice, ruName) {
    this.buffer = [];
    this.options = [];

    this.buffer = this.wordsBuffer;
    this.buffer.forEach(e => {
      if (e.ruName !== this.slicedWords[this.qnProgress + 1].ruName) {
        this.options.push(e.ruName);
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
