import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogDetailsRoutingModule } from './blog-details.routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BlogDetailsRoutingModule
  ]
})
export class BlogDetailsModule { }
