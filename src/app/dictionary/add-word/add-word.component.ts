import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Words} from '../../shared/models/words.model';
import {Subscription} from 'rxjs/Subscription';
import {WordsService} from '../../words.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {

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

  onSubmit() {
    const formData = this.form.value;
    console.log(formData, 'formData');
    this.sub1 = this.wordsService.addWord(formData)
      .subscribe((word: Words) => {
        console.log(word, 'word');
        this.form.reset();
        this.wordAdd.emit(word);
      });
  }
}
