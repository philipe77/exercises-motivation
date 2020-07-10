import { MaterialModule } from './../material.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        FormsModule,
        MaterialModule
        ],
    exports:[
        CommonModule,
        FormsModule,
        MaterialModule
    ]
})
export class SharedModule{}