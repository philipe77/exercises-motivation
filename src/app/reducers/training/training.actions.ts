import { Exercise } from './../../training/exercise.model';
import { Action } from "@ngrx/store";

export const SET_AVAILABLE_TRAININGS = '[Training] set available trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Unavailable trainings';
export const SET_START_TRAINING = '[Training] Set start trainings';
export const SET_STOP_TRAINING = '[Training] Set stop training';

export class setAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;
    
    //lazy loading 
    constructor(public payload:Exercise[]){}
}

export class setFinishedExercises implements Action {
    readonly type = SET_FINISHED_TRAININGS;   
    //lazy loading 
    constructor(public payload:Exercise[]){}
}

export class setStartTrainings implements Action {
    readonly type = SET_START_TRAINING;   

    //lazy loading 
    constructor(public payload:string){}
}

export class setStopTrainings implements Action {
    readonly type = SET_STOP_TRAINING;   
}

export type trainingActions = setFinishedExercises | setStartTrainings | setAvailableTrainings | setStopTrainings; 
