import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoapprovePostComponent } from './noapprove-post/noapprove-post.component';
import { AdminSharedModule } from '../shared/admin-shared/admin-shared.module';
import { ApproveRoutingModule } from './approve-post-routing';



@NgModule({
  declarations: [
    NoapprovePostComponent
  ],
  imports: [
    CommonModule,
    AdminSharedModule,
    ApproveRoutingModule
  ]
})
export class ApprovePostModule { }
