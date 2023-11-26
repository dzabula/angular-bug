import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoapprovePostComponent } from './noapprove-post/noapprove-post.component';




const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: NoapprovePostComponent,
    data: { title: "" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveRoutingModule { }