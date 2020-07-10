import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import {Subscription, Observable} from 'rxjs'
import { Store } from '@ngrx/store';
import * as fromRoot from  '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output()  sideNavTogle = new EventEmitter<void>();
  isAuth$:Observable<boolean> ;
  authSubscription:Subscription;

  constructor(private authService:AuthService, private store:Store<fromRoot.State>) { }

  ngOnInit(): void {

    this.isAuth$ =this.store.select(fromRoot.getIsAuth);
    /* this.authSubscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    }); */
  }

  onToggleSideNav(){
    this.sideNavTogle.emit();
  }

  ngOnDestroy():void{
    //this.authSubscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
