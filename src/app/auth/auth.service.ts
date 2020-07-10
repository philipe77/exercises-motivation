import { Store } from '@ngrx/store';
import { UIService } from './../shared/ui-service';
import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-user.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth'
import * as fromRoot from '../app.reducer'
import * as UI from '../reducers/ui/ui-actions';
import * as Auth from '../reducers/auth/auth.actions';

@Injectable()
export class AuthService{
    /* authChange = new Subject<boolean>();
    private isAuthenticated:boolean =false; */

    constructor(private router: Router, private auth: AngularFireAuth, 
                private trainingService:TrainingService,
                private store:Store<fromRoot.State>,
                private uiService:UIService){}

    initAuthListener(){
        this.auth.authState.subscribe(user=>{
            if(user){
                /* this.isAuthenticated = true;
                this.authChange.next(true); */
                this.store.dispatch(new Auth.setAuthenticated())
                this.router.navigate(['training']);
            }else {
                this.trainingService.cancelSubscriptions();
                this.store.dispatch(new Auth.setUnathenticated())
                //this.authChange.next(false);
                this.router.navigate(['login']);
                //this.isAuthenticated = false;
            }
        })
    }

    registerUser(authData:AuthData){
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result=>{
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
        }).catch(erro=>{
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(erro.message, null, 3000);
        }) 
    }

    login(authData:AuthData){
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result=>{
            this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
        }).catch(erro=>{
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(erro.message, null, 3000);
        })
        
    }

    logout(){
        this.auth.signOut(); 
    }

    /* isAuth(){
        return this.isAuthenticated;
    } */
}