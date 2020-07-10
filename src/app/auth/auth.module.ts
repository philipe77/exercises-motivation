import { AuthRouting } from './auth-routing.module';
import { SharedModule } from './../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';


@NgModule({
    declarations:[SignupComponent, LoginComponent],
    imports:[
            ReactiveFormsModule,
            AngularFireAuthModule,
            SharedModule,
            AuthRouting
        ],
    exports:[]
})
export class AuthModule{}