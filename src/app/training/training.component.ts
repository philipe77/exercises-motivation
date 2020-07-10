import { Store } from '@ngrx/store';
import { UIService } from './../shared/ui-service';
//import { Subscription, Observable } from 'rxjs';
import { TrainingService } from './training.service';
//import { Exercise } from './exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromTraining from '../reducers/training/training.reducers'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit , OnDestroy{

  onGoingtraining$:Observable<boolean>;
  //exerciseSubscription:Subscription;
  
  constructor(private trainingService:TrainingService, private uiService:UIService, private store:Store<fromTraining.State>) { }

  ngOnInit(): void {
   
    this.onGoingtraining$ = this.store.select(fromTraining.getIsTraining);

    /* this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(ex=>{
      if(ex){
        this.onGoingtraining = true;
      } else {
        this.onGoingtraining = false;
      }
      
    }) */
  }

  ngOnDestroy(){
    /* if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    } */
    
  }
}
