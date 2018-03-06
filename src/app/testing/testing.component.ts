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
  isLoaded = false;
  sub1: Subscription;
  ruNames = [];

  qnProgress = 0;
  answers = [];

  constructor(private wordsService: WordsService, private router: Router) {
  }

  ngOnInit() {
    this.sub1 = this.wordsService.getWords()
      .subscribe((words: Words[]) => {
        console.log(words, 'words');
        this.words = words;
        this.words.forEach((e) => {
          this.ruNames.push(e.ruName);
        });
        this.isLoaded = true;
        console.log(this.ruNames, 'this.ruNames');
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  Answer(qID, choice) {
    this.answers.push({
      'id': qID,
      'answer': choice
    });
    this.qnProgress++;
    console.log(this.answers, 'answers');
    if (this.qnProgress === 10) {
      localStorage.setItem('answers', JSON.stringify(this.answers));
      this.router.navigate(['/result']);
    }
  }
}
