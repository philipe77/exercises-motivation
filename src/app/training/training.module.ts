import { TrainingRoutingModule } from './training-routing.module';
import { SharedModule } from './../shared/shared.module';
import { StopTrainingComponent } from './stop-training-component';
import {StoreModule} from '@ngrx/store'
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingComponent } from './training.component';
import {ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {trainingReducer} from '../reducers/training/training.reducers'

@NgModule({
    declarations:[
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    imports:[
        SharedModule,
        ReactiveFormsModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer)
        
    ],
    entryComponents:[StopTrainingComponent],
    exports:[]
})
export class TrainingModule{}