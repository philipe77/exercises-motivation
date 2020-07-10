import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Exercise } from './../../training/exercise.model';
import {trainingActions, 
    SET_AVAILABLE_TRAININGS, 
    SET_FINISHED_TRAININGS, 
    SET_START_TRAINING, 
    SET_STOP_TRAINING} from './training.actions';
import * as fromRoot from '../../app.reducer'

export interface TrainingState {
    availablesExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise
}


//Lazy Loading After from root is called
export interface State extends fromRoot.State {
    training:TrainingState
}

const initialState:TrainingState ={
    availablesExercises:[],
    finishedExercises:[],
    activeTraining:null 
}

export function trainingReducer(state = initialState, action:trainingActions){
    
    switch (action.type){
        case SET_AVAILABLE_TRAININGS: 
            return {
                    ...state,
                    availablesExercises: action.payload
                };
        case SET_FINISHED_TRAININGS: 
            return {
                ...state,
                finishedExercises:action.payload
            };
        case SET_START_TRAINING: 
            return {
                ...state,
                activeTraining: {...state.availablesExercises.find(ex => ex.id === action.payload)}
            };
        case SET_STOP_TRAINING: 
            return {
                ...state,
                activeTraining:null
            }
        default:{
            return state;
        }
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');


export const getAvailableTraining = createSelector(getTrainingState,(state:TrainingState)=> state.availablesExercises);
export const getFinishedTraining = createSelector(getTrainingState, (state:TrainingState)=> state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState,(state:TrainingState)=> state.activeTraining);
export const getIsTraining = createSelector(getTrainingState,(state:TrainingState)=> state.activeTraining != null);