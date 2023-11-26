import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTagComponent } from './components/create-tag/create-tag.component';




const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: CreateTagComponent,
    data: { title: "Kreiranje Taga" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTagRoutingModule { }
