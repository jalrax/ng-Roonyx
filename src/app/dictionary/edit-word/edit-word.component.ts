import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Words} from '../../shared/models/words.model';
import {Subscription} from 'rxjs/Subscription';
import {WordsService} from '../../words.service';

@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit {

  @Input() words: Words[] = [];
  @Output() wordEdit = new EventEmitter<Words>();

  sub1: Subscription;
  form: FormGroup;
  currentWordId = 1;
  currentWord: Words;

  constructor(private wordsService: WordsService) {
  }

  ngOnInit() {
    this.onCategoryChange();
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'ruName': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    const formData = this.form.value;
    const word = new Words(formData.name, formData.ruName, +this.currentWordId);
    this.sub1 = this.wordsService.updateWord(word)
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
