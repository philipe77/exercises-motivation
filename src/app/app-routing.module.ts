import { AuthGuard } from './auth/auth.guard';

import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './training/welcome/welcome.component'

const routes:Routes = [
    {path:'', component: WelcomeComponent},
    {path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule), canLoad:[AuthGuard] }
    
]
@NgModule({

    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    providers:[AuthGuard ]
})
export class AppRoutingModule {} 