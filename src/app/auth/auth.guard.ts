import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from  '../app.reducer';
import { Route } from '@angular/compiler/src/core';
import { take } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad  {
    
    constructor(private authService:AuthService, private router:Router, private store:Store<fromRoot.State>){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
       /*  if (this.authService.isAuth()){
            return true;
        } else{
            this.router.navigate(['/login']);
        } */
    }
    canLoad(route: Route){
       /*  if (this.authService.isAuth()){
            return true;
        } else{
            this.router.navigate(['/login']);
        } */
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}
