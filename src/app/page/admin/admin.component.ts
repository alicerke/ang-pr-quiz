import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  quizList$: Observable<Quiz[]> = this.quizService.list$;

  selectDelQuiz: Quiz = new Quiz();

  constructor(
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.quizService.getAll();
  }

  addToDeleteQuiz(quiz: Quiz): void {
    this.selectDelQuiz = quiz;
  }

  deleteQuiz(): void {
    this.quizService.remove(this.selectDelQuiz);
  }

  // Sorter pipe
  columnKey: string = '';
  direction: string = '';

  onColumnSelect(key: string): void {
    if (this.columnKey != key) {
      this.direction = 'asc';
    } else {
      this.direction = this.swichDirectionValue();
    }
    this.columnKey = key;
  }

  swichDirectionValue(): any {
    if (this.direction === '' || this.direction === 'dsc') {
      return this.direction = 'asc';
    }
    return this.direction = 'dsc';
  }

  //Filter pipes
  filterPhrase: string = '';
  filterKey: string = 'title';

  onChangePhrase(event: Event): void {
    this.filterPhrase = (event.target as HTMLInputElement).value;
  }


}
