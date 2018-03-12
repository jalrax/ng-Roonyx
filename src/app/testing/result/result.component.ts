import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  private correctAnswerCount = 0;

  constructor(private _router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('answers') === null) {
      this._router.navigate(['/testing']);
    }
    const answers = JSON.parse(localStorage.getItem('answers'));
    const ruNames = JSON.parse(localStorage.getItem('ruNames'));
    answers.forEach((item, i) => {
      if (item === ruNames[i]) {
        this.correctAnswerCount++;
      }
    });
    localStorage.clear();
  }

}
