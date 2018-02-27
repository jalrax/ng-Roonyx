import {Component, Input, OnInit} from '@angular/core';
import {Words} from '../../shared/models/words.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {WordsService} from '../../words.service';

@Component({
  selector: 'app-list-word',
  templateUrl: './list-word.component.html',
  styleUrls: ['./list-word.component.css']
})
export class ListWordComponent implements OnInit {

  @Input() words: Words[] = [];
  form: FormGroup;

  constructor(private wordsService: WordsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'ruName': new FormControl(null, [Validators.required])
    });
  }

  onWordDelete() {
  }
}
