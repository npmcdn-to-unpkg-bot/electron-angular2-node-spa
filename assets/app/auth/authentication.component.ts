import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {SignupComponent} from './signup.component';
import {SigninComponent} from './signin.component';
import {LogoutComponent} from './logout.component';
import {AdminComponent} from './admin.component';



@Routes([
    {path: '/signup/:id', component: SignupComponent},      //child routes
    {path: '/signup', component: SignupComponent},      //child routes
    {path: '/signin', component: SigninComponent},       //child routes
    {path: '/logout', component: LogoutComponent},       //child routes
    {path: '/admin', component: AdminComponent},       //child routes
])

@Component ({
    selector: 'my-auth',
    template: `
            <header>
                    <ul class="nav nav-pills" id="sublinks">
                        <li><a class="menu-button" [routerLink]="['./signup']">Create User</a></li>
                        <li><a class="menu-button"  [routerLink]="['./signin']">Sign-in</a></li>
                        <li><a class="menu-button"  [routerLink]="['./logout']">Logout</a></li>
                        <li><a class="menu-button"  [routerLink]="['./admin']">Admin</a></li>
                    </ul>
            </header>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    styles: [`
    header {
    background: white;
    color: #000;
    position: relative;
    

    animation-name: slideDown;
	animation-duration: 1s;	
	animation-timing-function: ease;	
	visibility: visible !important;
}
header ul {
    list-style: none;
    margin-bottom: 20px;
    padding: 0;
}
header ul li{
    display: inline-block;
    margin-right: 20px
}

@keyframes slideDown {
    0% {
		transform: translateY(-100%);
	}
	50%{
		transform: translateY(8%);
	}
	65%{
		transform: translateY(-4%);
	}
	80%{
		transform: translateY(4%);
	}
	95%{
		transform: translateY(-2%);
	}			
	100% {
		transform: translateY(0%);
	}	
}

ul#sublinks > li {    
    background-color: rgba(0, 72, 255, 0.04);
    border-radius: 10%;
    font-weight: bold;
}

.nav ul > li:hover ul {
    visibility:visible;
    opacity:1;
    filter:alpha(opacity=100);
}
    `]
})

export class AuthenticationComponent {

}



// ul#sublinks {
   
//     transition:2000ms ease-in-out;

// }

    // 0% {
    //     transform: translateY(-80px);
    // }
    // 100% {
    //     transform: translateY(0);
    // }

    // animation-name: dropHeader;
    // animation-iteration-count: 1;
    // animation-timing-function: ease-out;
    // animation-duration: 0.6s;