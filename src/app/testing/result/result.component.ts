import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  correctAnswerCount = 0;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('answers') === null) {
      this.router.navigate(['/testing']);
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
