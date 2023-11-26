import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';




const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: CreateComponent,
    data: { title: "Kreiranje Moderatora" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateModeratorRoutingModule { }
