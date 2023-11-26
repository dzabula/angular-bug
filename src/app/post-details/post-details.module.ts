import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostDetailsRoutingModule } from './post-details-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostDetailsRoutingModule
  ]
})
export class PostDetailsModule { }
