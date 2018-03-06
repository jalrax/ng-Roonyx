import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Words} from '../../shared/models/words.model';
import {Subscription} from 'rxjs/Subscription';
import {WordsService} from '../../words.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  correctAnswerCount = 0;
  words: Words[] = [];
  isLoaded = false;
  sub1: Subscription;

  constructor(private wordsService: WordsService, private router: Router) {
  }


  ngOnInit() {
    this.sub1 = this.wordsService.getWords()
      .subscribe((words: Words[]) => {
        this.words = words;
        this.isLoaded = true;

        const storage = JSON.parse(localStorage.getItem('answers'));
        console.log(storage, 'storage');
        console.log(this.words, 'words');

        this.words.forEach((e, i) => {
          console.log(e.ruName, 'e.ruName');
          console.log(storage[i].answer, 'storage[i].answer');
          if (e.ruName === storage[i].answer) {
            this.correctAnswerCount++;
          }
        });
      });

    if (localStorage.getItem('answers') === null) {
      this.router.navigate(['/testing']);
    }
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
