import { Store } from '@ngrx/store';
import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './../stop-training-component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import * as fromTraining from '../../reducers/training/training.reducers'
import * as fromRoot from '../../app.reducer'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  
  progress = 0;
  timer:number;

  constructor(private matDialog:MatDialog, private trainingService:TrainingService,
    private store:Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.startOrResumeTimer()
    
  }

  startOrResumeTimer(){
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((exercise=>{
      const step = exercise.duration / 100 * 1000;

      this.timer =setInterval(()=>{
        this.progress = this.progress + 1;
        if(this.progress === 100 ){
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        };
      }, step)
    }))
    
  }

  onStop(){
     clearInterval(this.timer);
     const dialogRef = this.matDialog.open(StopTrainingComponent,{
      data:{progress: this.progress}
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.trainingService.cancelExercise(this.progress)
      }else{
        this.startOrResumeTimer()
      }
    })
  }
 
}
