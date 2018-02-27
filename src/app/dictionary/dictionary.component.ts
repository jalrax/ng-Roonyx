import { Component, OnInit } from '@angular/core';
import {WordsService} from '../words.service';
import {Words} from '../shared/models/words.model';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {

  words: Words[] = [];
  isLoaded = false;

  constructor(private wordsService: WordsService) { }

  ngOnInit() {
    this.wordsService.getWords()
      .subscribe((words: Words[]) => {
        this.words = words;
        this.isLoaded = true;
      });
  }

  newWordAdded(word: Words) {
    this.words.push(word);
  }

  wordWasEdited(word: Words) {
    const idx = this.words
      .findIndex(w => w.id === word.id);
    this.words[idx] = word;
  }

}
