import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogComponent } from './components/create/create.component';




const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: CreateBlogComponent,
    data: { title: "Kreiranje Blog Posta" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBlogRoutingModule { }