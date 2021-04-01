import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';


@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

  quizID: number = 0;

  question$: Observable<Question> = this.activatedRoute.params.pipe(
    switchMap( params => {
      this.quizID = params.quizId;
      const id = typeof params.id === 'string' ? parseInt(params.id, 10) : params.id;
      if ( id === 0 ) {
        let question = new Question();
        question.answers = this.array
        return of (question)
      }
      return this.questionService.get(params.id)
    })
  );

  array: Answer[] = [
    { id: 0, content: '', correct: false },
    { id: 1, content: '', correct: false },
    { id: 2, content: '', correct: false },
    { id: 3, content: '', correct: false }
  ]

  question: Question = new Question();

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(question: Question): void {
    try {
      if (question.id == 0) {
        this.questionService.create(question).subscribe(
          question => {
            this.quizService.get(this.quizID).subscribe(
              quiz => {
                quiz.questions.push(question.id)
                this.quizService.update(quiz).subscribe(
                  () => this.router.navigate(['/quiz-editor/'+ this.quizID ])
                )
              })
          },
        );
      }
      else {
        this.questionService.update(question).subscribe(
          () => this.router.navigate(['/admin'])
        );
      }
    } catch (error) {
      err => console.error(err)
    }
  }

}
