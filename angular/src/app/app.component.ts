import {Component, OnInit } from '@angular/core';
import 'reflect-metadata';
import {Title} from '@angular/platform-browser';
import {KeycloakService} from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;

    title = '[Dai:Si] - Dataset Search UI';

    user = '';

    indexes = [
        {
            key: 'gfbio',
            link: '/'
        }
        /*, {
                    key: 'biodiv',
                    link: '/bio-div'
                }*/
    ];

    constructor(private titleService: Title, private keycloakService: KeycloakService) {
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    private initializeUserOptions(): void {
        try{
            this.user = this.keycloakService.getUsername();
            this.keycloakService.loadUserProfile().then(profile => {
                console.log(profile.username);
                console.log(profile['attributes']); //gives you array of all attributes of user, extract what you need
            });
        }catch{
            this.user = null;
        }
        
    }

    public async ngOnInit() {
        this.titleService.setTitle(this.title);
        this.initializeUserOptions();

        if (await this.keycloakService.isLoggedIn()) {
            this.userProfile = await this.keycloakService.loadUserProfile();
          }

        // this.isLoggedIn = await this.keycloakService.isLoggedIn();

        // if (this.isLoggedIn) {
        //     this.userProfile = await this.keycloakService.loadUserProfile();
        //     console.log(this.userProfile);
        // }
    }

    public login() {
        this.keycloakService.login();
      }
    
    public logout() {
        this.keycloakService.logout();
      }
}
