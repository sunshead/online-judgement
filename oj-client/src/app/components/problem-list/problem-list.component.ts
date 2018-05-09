import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../services/data.service';
import { Problem } from '../../models/problem.model';

@Component({
    selector: 'app-problem-list',
    templateUrl: './problem-list.component.html',
    styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit, OnDestroy {
    problems: Problem[];
    subscriptionProblems: Subscription;

    // inject data service in constructor
    constructor(private dataService: DataService) { }
    ngOnInit() {
        // init problems list
        this.getProblems();
    }
    ngOnDestroy() {
      this.subscriptionProblems.unsubscribe();
    }
    getProblems() {
      this.subscriptionProblems = this.dataService.getProblems().subscribe(problems => this.problems = problems);
    }
}
