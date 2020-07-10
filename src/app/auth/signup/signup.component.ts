import { Subscription } from 'rxjs';
import { UIService } from './../../shared/ui-service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading:boolean = false;
  loadingSubs:Subscription;

  constructor(private authService:AuthService, private uiService:UIService) { }

  maxDate:Date = new Date();

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(loading=>{
      this.isLoading = loading;
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }


  onSubmit(form:NgForm){
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy(){
    if(this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }
  }
}
