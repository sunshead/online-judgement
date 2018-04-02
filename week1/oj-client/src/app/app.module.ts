import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { DataService } from './services/data.service';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { routing } from './app.routes';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent
  ],
  imports: [
  	routing,
    FormsModule,
    BrowserModule
  ],
  providers: [
  	DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
