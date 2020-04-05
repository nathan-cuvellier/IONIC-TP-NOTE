import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditerPageRoutingModule } from './editer-routing.module';

import { EditerPage } from './editer.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditerPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [EditerPage]
})
export class EditerPageModule {}
