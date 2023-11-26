import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontComponent } from './components/font/font.component';



const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: FontComponent,
    data: { title: "Registracija" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FontRoutingModule { }
