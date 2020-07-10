import { Subscription, Observable } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from  '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit , OnDestroy {

  @Output() closeSideNav = new EventEmitter<void>();
  isAuth$:Observable<boolean>;
  authSubscription: Subscription;

  constructor(private authService:AuthService, private store:Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    /* this.authSubscription = this.authService.authChange.subscribe(auth=>{
      this.isAuth = auth
    }) */
  }

  onCloseSideNav(){
    this.closeSideNav.emit();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  onLogout(){
    this.onCloseSideNav()
    this.authService.logout();
  }

}
