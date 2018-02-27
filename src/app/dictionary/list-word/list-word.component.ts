import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

import {Words} from '../../shared/models/words.model';
import {WordsService} from '../../words.service';

@Component({
  selector: 'app-list-word',
  templateUrl: './list-word.component.html',
  styleUrls: ['./list-word.component.css']
})
export class ListWordComponent implements OnInit, OnDestroy {

  @Input() words: Words[] = [];
  @Output() wordDelete = new EventEmitter<Words>();
  form: FormGroup;
  sub1: Subscription;

  constructor(private wordsService: WordsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'ruName': new FormControl(null, [Validators.required])
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  onWordDelete(word: Words) {
    this.sub1 = this.wordsService.deleteWord(word)
      .subscribe((wordsStream: Words) => {
        this.wordDelete.emit(word);
      });
  }
}
