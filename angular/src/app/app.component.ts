import {Component} from '@angular/core';
import 'reflect-metadata';
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title ="[Dai:Si] - Dataset Search UI";

	indexes = [
        {
            key: 'gfbio',
            link: '/'
        }
    ];

    constructor(private titleService: Title) {
    }

	public setTitle( newTitle: string) {
	 this.titleService.setTitle( newTitle );
	 }

    ngOnInit() {
      this.titleService.setTitle(this.title);
  }
}
