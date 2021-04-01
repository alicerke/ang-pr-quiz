import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss']
})
export class QuizEditorComponent implements OnInit {

  questions: Question[] = [];
  quizID = 0;

  quiz$: Observable<Quiz> = this.activatedRoute.params.pipe(
    switchMap( params => {
      const id = typeof params.id === 'string' ? parseInt(params.id, 10) : params.id;
      if ( id === 0 ) {
        return of ( new Quiz());
      }
      return this.quizService.get(params.id).pipe(
        tap(
          item => {
            item.questions.forEach(
              item => this.questionService.get(item).subscribe(
                quest => this.questions.push(quest)
              )
            )
          }
        )
      )
    })
  );

  constructor(
    private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(quiz: Quiz): void {
    try {
      if (quiz.id == 0) {
        this.quizService.create(quiz).subscribe(
            item => {
              this.router.navigate(['/question-editor/' + 0 + '/'+ item.id ])
            }
        );
      }
      else {
        this.quizService.update(quiz).subscribe(
          () => this.router.navigate(['/admin'])
        );
      }
    } catch (error) {
      err => console.error(err)
    }
  }

}
