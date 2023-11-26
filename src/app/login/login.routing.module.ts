import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/log-in/log-in.component';



const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LoginComponent,
    data: { title: "Log In" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogInRoutingModule { }
