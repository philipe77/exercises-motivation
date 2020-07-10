
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { UIService } from './../../shared/ui-service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm:FormGroup;
  isLoading$:Observable<boolean>;
  private loadingSubs:Subscription;

  constructor(private authService:AuthService, 
              private uiService:UIService,
              private store:Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
   /*  this.store.subscribe(resp=>{console.log(resp)})
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading =>{
      this.isLoading$ = isLoading;
    }) */
    this.loginForm = new FormGroup({
      email: new FormControl ('',{validators:[Validators.required, Validators.email]}),
      password: new FormControl('',{validators:[Validators.required, Validators.minLength(6)]})
    })
    
  }

  onSubmit(){
    
    this.authService.login({
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    })
  }


  /* ngOnDestroy(){
    if(this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }
    
  } */
}
