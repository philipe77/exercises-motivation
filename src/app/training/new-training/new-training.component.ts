import { Store } from '@ngrx/store';
import { UIService } from './../../shared/ui-service';
import { Subscription, Observable } from 'rxjs';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {NgForm } from '@angular/forms';
import * as fromTraining from '../../reducers/training/training.reducers'
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  constructor(private trainingService:TrainingService, private uiService:UIService,
              private store:Store<fromTraining.State>) { }

  allExercises$ :Observable<Exercise[]>
  loading$:Observable<boolean>;
  //exerciseSubscription: Subscription;

  
  //loadSubs:Subscription;

  ngOnInit(): void {
    this.loading$ = this.store.select(fromRoot.getIsLoading);
    this.allExercises$ = this.store.select(fromTraining.getAvailableTraining);
    /* this.loadSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.loading = isLoading;
      }); */

    //this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises=> this.allExercises = exercises);
    this.fetchExercises()
  }

  fetchExercises(){
    this.trainingService.fetchtAvaivableExercises();
  }

  onStartTraining(exerciseForm:NgForm){
    this.trainingService.startExercise(exerciseForm.value.exercise);
  }


  ngOnDestroy(){
    /* if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
    if(this.loadSubs){
      this.loadSubs.unsubscribe();
    } */
  }



}


