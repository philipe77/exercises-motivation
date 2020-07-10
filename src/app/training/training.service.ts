import { Store } from '@ngrx/store';
import { UIService } from './../shared/ui-service';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators'
import { Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';

import * as UI from '../reducers/ui/ui-actions';
import * as fromTraining from '../reducers/training/training.reducers';
import * as TrainingActions from '../reducers/training/training.actions';

@Injectable()
export class TrainingService{

    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private avaliableExercises:Exercise[] =[];
    private runningExercise:Exercise;
    private fbSubscriptions:Subscription[]=[]
    
    constructor(private dbFire: AngularFirestore, private uiService:UIService, private store:Store<fromTraining.State>){}

    fetchtAvaivableExercises():void{
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading())
        this.fbSubscriptions.push(this.dbFire.collection('avaliableExercises')
        .snapshotChanges()
        .pipe(map(docArray =>{
            return docArray.map(doc=>{
                return {
                    id: doc.payload.doc.id,
                    ...doc.payload.doc.data() as {}
                };
            });
        })).subscribe((exercises:Exercise[])=>{
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new TrainingActions.setAvailableTrainings(exercises));
            /* this.avaliableExercises = exercises
            this.exercisesChanged.next([...this.avaliableExercises]); */
        }, erro =>{
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading())
            this.exercisesChanged.next(null);
            this.uiService.showSnackBar('Fetching Exercises Failed, please try again later', null, 3000);
        }));
    }

    startExercise(selectId:string):void{
        //this.dbFire.doc('avaliableExercises/'+ selectId).update({lastTime: new Date()})
        /* this.runningExercise = this.avaliableExercises.find(ex=>ex.id === selectId)
        this.exerciseChanged.next({...this.runningExercise}); */
        this.store.dispatch(new TrainingActions.setStartTrainings(selectId));
    }

    /* getRunningExercise(){
        return {...this.runningExercise};
    } */

    completeExercise():void{
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
            this.addDataToDataBase({...this.runningExercise, date: new Date(), state:'completed'})
            /* this.runningExercise = null;
            this.exerciseChanged.next(null); */
        })
        this.store.dispatch(new TrainingActions.setStopTrainings());
      }
    
      cancelExercise(progress:number):void{
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
            this.addDataToDataBase({
                ...ex, 
                date: new Date(), 
                state:'cancelled', 
                duration: ex.duration * (progress / 100), 
                calories:ex.calories * (progress / 100)
            })
        })
        //this.runningExercise = null;
        //this.exerciseChanged.next(null);
        this.store.dispatch(new TrainingActions.setStopTrainings());
      }

      fetchCompletedOrCanceledExercises(){
        

          this.fbSubscriptions.push(this.dbFire.collection('finishedExercises').valueChanges().subscribe((exercises:Exercise[])=>{
              //this.finishedExercisesChanged.next(exercises)
              this.store.dispatch(new TrainingActions.setFinishedExercises(exercises));
          }));
      }

      cancelSubscriptions(){
          this.fbSubscriptions.forEach(sub => sub.unsubscribe());
      }

      addDataToDataBase(exercise:Exercise){
         this.dbFire.collection('finishedExercises').add(exercise);
      }
}