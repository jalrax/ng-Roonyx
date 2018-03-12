import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Words } from '../../shared/models/words.model';
import { WordsService } from '../../words.service';

@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit, OnDestroy {

  @Input() words: Words[] = [];
  @Output() wordEdit = new EventEmitter<Words>();

  private subscription: Subscription;
  private form: FormGroup;
  private currentWordId;
  private currentWord: Words;

  constructor(private _wordsService: WordsService) {
  }

  ngOnInit() {
    this.currentWordId = this.words[0].id;
    this.onCategoryChange();
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'ruName': new FormControl(null, [Validators.required])
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    const formData = this.form.value;
    const word = new Words(formData.name, formData.ruName, +this.currentWordId);
    this.subscription = this._wordsService
      .updateWord(word)
      .subscribe((wordStream: Words) => {
        this.wordEdit.emit(wordStream);
      });
  }

  onCategoryChange() {
    this.currentWord = this.words
      .find(w => w.id === +this.currentWordId);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
