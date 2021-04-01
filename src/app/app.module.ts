import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { AdminComponent } from './page/admin/admin.component';
import { HomeComponent } from './page/home/home.component';
import { QuizComponent } from './page/quiz/quiz.component';
import { QuizEditorComponent } from './page/quiz-editor/quiz-editor.component';
import { QuestionEditorComponent } from './page/question-editor/question-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { SorterPipe } from './pipe/sorter.pipe';
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AdminComponent,
    HomeComponent,
    QuizComponent,
    QuizEditorComponent,
    QuestionEditorComponent,
    SorterPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
