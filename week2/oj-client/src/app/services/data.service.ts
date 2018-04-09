import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
    // private field start with _
    // BehaviorSubject: when subscribe, we can get the value that was emitted last time.
    // Subject: when subscribe, we can only get the value that was emitted after subscribe,
    // and we cannot get value that was emitted before we subscribe.

    private _problemSource = new BehaviorSubject(<Problem[]>([]));

    constructor(private httpClient: HttpClient) { }

    // return a list of problems
    getProblems(): Observable<Problem[]> {
        this.httpClient.get('api/v1/problems')
            .toPromise()
            .then((res: any) => {
                // .next: next data
                this._problemSource.next(res);
            })
            .catch(this.handleError);
        return this._problemSource.asObservable();
    }

    // return a problem by input id
    getProblem(id: string): Promise<Problem> {
        return this.httpClient.get(`api/v1/problems/${id}`)
            .toPromise()
            .then((res: any) => {
                console.log(res)
                return res;
            }) // same as { return res }
            .catch(this.handleError);
    }

    addProblem(problem: Problem) {
        const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.httpClient.post('api/v1/problems', problem, options)
            .toPromise()
            .then((res: any) => {
                this.getProblems();
                return res;
            })
            .catch(this.handleError);
    }
    private handleError(err: any): Promise<any> {
        console.error('an error occured', err)
        return Promise.reject(err.body || err);
    }
}
