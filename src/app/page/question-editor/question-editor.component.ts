import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/service/question.service';


@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

  question$: Observable<Question> = this.activatedRoute.params.pipe(
    switchMap( params => {
      const id = typeof params.id === 'string' ? parseInt(params.id, 10) : params.id;
      if ( id === 0 ) {
        return of ( new Question());
      }
      return this.questionService.get(params.id)
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
  }

}
