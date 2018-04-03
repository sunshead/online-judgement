import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-problem-list',
    templateUrl: './problem-list.component.html',
    styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
    // private problems list inside the component
    problems: Problem[];

    // inject data service in constructor
    constructor(private dataService: DataService) { }
    ngOnInit() {
        // init problems list
        this.getProblems();
    }
    getProblems() {
        // this.problems = PROBLEMS;
        this.problems = this.dataService.getProblems();
    }
}
