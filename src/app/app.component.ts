import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Super Symmetry';
    show: boolean;
    constructor(private router: Router) {
    }
    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event:
        KeyboardEvent) {
        const closeModalBox: HTMLElement = document.getElementById('closeModal') as HTMLElement;
        closeModalBox.click();
    }
    // @HostListener('contextmenu', ['$event'])
    // onRightClick(event) {
    //     event.preventDefault();
    // }
    ngOnInit() {
        if (localStorage.getItem('user_token') == null) {
            this.router.navigate(['']);
        }
        // this.networkTest();
    }

    // networkTest() {
    //     if (navigator.onLine) {
    //         alert("You are Online")
    //     }
    //     else {
    //         alert("You are Offline")
    //     }
    // }
}
