import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CollaborationService } from '../../services/collaboration.service';
import { DataService } from '../../services/data.service';

declare var ace: any; // since ace is not written by ts, use type any

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    editor: any;
    languages: string[]  = ['Java', 'Python', 'C++'];
    language = 'Java';
    defaultContent = {
        'Java': ` public class Example {
           public static void main(String[] args) {
            // Type your Java code here
           }
        }`,
        'Python': `class Solution:
            def example():
                # write your python code here.
        `,
        'C++': `int main()
            {
                return 0;
            }
        `
    };
    sessionId: string;
    output: string; // for storing build and run output

    constructor(private collaboration: CollaborationService,
                private route: ActivatedRoute,
                private dataService: DataService) { }

    ngOnInit() {
        // use problem id as session id
        // since we subscribe the changes, every time the params changes
        // sessionId will be updated and the editor will be initilized
        this.route.params
            .subscribe(params => {
              this.sessionId = params['id'];
              this.initEditor();
              this.collaboration.restoreBuffer();
            });
    }

    initEditor(): void {
        this.editor = ace.edit('editor');
        this.editor.setTheme('ace/theme/eclipse');
        this.resetEditor();

        // setup collaboration socket
        this.collaboration.init(this.editor, this.sessionId);
        this.editor.lastAppliedChange = null;
        // register change callback
        this.editor.on('change', (e) => {
            console.log('editor changes: ' + JSON.stringify(e));
            // check if the change is same as last change,
            // if they are the same, skip this change
            if (this.editor.lastAppliedChange !== e) {
                this.collaboration.change(JSON.stringify(e));
            }
        });
    }
    resetEditor(): void {
        this.editor.setValue(this.defaultContent[this.language]);
        this.editor.getSession().setMode(
          'ace/mode/' + this.language.toLowerCase()
        );
    }
    setLanguage(language: string): void {
        this.language = language;
        this.resetEditor();
    }
    submit(): void {
        const user_code = this.editor.getValue();
        console.log(user_code);

        const data = {
            usercode: user_code,
            lang: this.language.toLocaleLowerCase()
        };

        this.dataService.buildAndRun(data).then(res => this.output = res.text);
    }
}
