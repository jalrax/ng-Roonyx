import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

import {Words} from '../../shared/models/words.model';
import {WordsService} from '../../words.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit, OnDestroy {

  @Output() wordAdd = new EventEmitter<Words>();
  form: FormGroup;
  words: any[] = [];
  sub1: Subscription;

  constructor(private wordsService: WordsService) {
  }

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

  onSubmit() {
    const formData = this.form.value;
    this.sub1 = this.wordsService.addWord(formData)
      .subscribe((word: Words) => {
        this.form.reset();
        this.wordAdd.emit(word);
      });
  }
}
