import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';




const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: CreatePostComponent,
    data: { title: "Kreiranje Posta" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePostRoutingModule { }
