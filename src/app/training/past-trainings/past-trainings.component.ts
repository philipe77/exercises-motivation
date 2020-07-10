import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.model';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as fromTraining from '../../reducers/training/training.reducers'


@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedCollumns = ['date','name','duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  //exChangedSubscription:Subscription;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private trainingService:TrainingService, private store:Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.store.select(fromTraining.getFinishedTraining).subscribe((exercises:Exercise[])=>{
      this.dataSource.data = exercises
    })
   /*  this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises:Exercise[])=>{
      this.dataSource.data = exercises
    }) */
    this.trainingService.fetchCompletedOrCanceledExercises();
  }

  ngAfterViewInit():void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(){
    /* if(this.exChangedSubscription){
      this.exChangedSubscription.unsubscribe();
    } */
     
  }

}