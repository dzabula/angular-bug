import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontRoutingModule } from './font-routing.module';
import { FontComponent } from './components/font/font.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FontComponent
  ],
  imports: [
    CommonModule,
    FontRoutingModule,
    FormsModule
  ]
})
export class FontModule { }
