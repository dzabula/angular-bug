import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './Components/create-category/create-category.component';




const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: CreateCategoryComponent,
    data: { title: "Kreiranje Moderatora" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCateogryRoutingModule { }
